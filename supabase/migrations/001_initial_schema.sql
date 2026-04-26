-- supabase/migrations/001_initial_schema.sql

-- ============================================================
-- USERS & ROLES
-- ============================================================
CREATE TYPE user_role AS ENUM ('super_admin', 'editor', 'marketing');

CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role          user_role NOT NULL DEFAULT 'editor',
  full_name     TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ESTIMATOR CONFIG  (admin-editable pricing rules)
-- ============================================================
CREATE TABLE estimator_config (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key      TEXT UNIQUE NOT NULL,  -- e.g. 'base_rate_per_sqft'
  config_value    JSONB NOT NULL,        -- supports scalars, objects, arrays
  display_label   TEXT,                  -- human readable label for admin UI
  updated_by      UUID REFERENCES users(id),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_estimator_config_key ON estimator_config(config_key);

-- ============================================================
-- ESTIMATES  (immutable snapshot per submission)
-- ============================================================
CREATE TABLE estimates (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  temple_type           TEXT NOT NULL,
  width_ft              NUMERIC(6,2) NOT NULL,
  height_ft             NUMERIC(6,2) NOT NULL,
  material_grade        TEXT NOT NULL,
  carving_complexity    TEXT NOT NULL,
  backlit               BOOLEAN DEFAULT FALSE,
  international_shipping BOOLEAN DEFAULT FALSE,
  price_min             INTEGER NOT NULL,
  price_max             INTEGER NOT NULL,
  config_snapshot       JSONB NOT NULL,   -- snapshot of rules at time of estimate
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LEADS
-- ============================================================
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'won', 'lost', 'spam');
CREATE TYPE lead_source AS ENUM ('estimator', 'contact_form', 'whatsapp', 'consultation', 'gallery');

CREATE TABLE leads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT,
  city            TEXT,
  message         TEXT,
  source          lead_source NOT NULL,
  status          lead_status DEFAULT 'new',
  estimate_id     UUID REFERENCES estimates(id),  -- nullable
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  recaptcha_score NUMERIC(3,2),
  assigned_to     UUID REFERENCES users(id),
  crm_id          TEXT,          -- external CRM record ID
  notified_at     TIMESTAMPTZ,   -- when notification was sent
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_phone ON leads(phone);

-- ============================================================
-- PRODUCTS (IRA + SPARSH catalogue)
-- ============================================================
CREATE TYPE product_line AS ENUM ('ira', 'sparsh');

CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  product_line    product_line NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  short_desc      TEXT,
  media_urls      JSONB DEFAULT '[]',   -- [{url, alt, type}]
  tags            TEXT[] DEFAULT '{}',
  is_published    BOOLEAN DEFAULT FALSE,
  sort_order      INTEGER DEFAULT 0,
  meta_title      TEXT,
  meta_description TEXT,
  created_by      UUID REFERENCES users(id),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_line_published ON products(product_line, is_published);
CREATE INDEX idx_products_slug ON products(slug);

-- ============================================================
-- PROJECTS (Legacy Works portfolio)
-- ============================================================
CREATE TABLE projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  client_name     TEXT,
  city            TEXT,
  year_completed  SMALLINT,
  description     TEXT,
  media_urls      JSONB DEFAULT '[]',
  tags            TEXT[] DEFAULT '{}',
  is_featured     BOOLEAN DEFAULT FALSE,
  is_published    BOOLEAN DEFAULT FALSE,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_published_featured ON projects(is_published, is_featured);

-- ============================================================
-- THEMES (Campaign Scheduler)
-- ============================================================
CREATE TYPE theme_status AS ENUM ('draft', 'scheduled', 'active', 'expired');

CREATE TABLE themes (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  TEXT NOT NULL,
  status                theme_status DEFAULT 'draft',
  start_date            TIMESTAMPTZ,
  end_date              TIMESTAMPTZ,
  priority              SMALLINT DEFAULT 1,
  hero_image_url        TEXT NOT NULL,
  hero_image_mobile_url TEXT,
  overlay_heading       TEXT NOT NULL,
  overlay_subheading    TEXT,
  cta_text              TEXT,
  cta_link              TEXT,
  background_color      TEXT,
  badge_text            TEXT,
  is_default            BOOLEAN DEFAULT FALSE,
  created_by            UUID REFERENCES users(id),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT one_default CHECK (
    (is_default = FALSE) OR (start_date IS NULL AND end_date IS NULL)
  )
);

CREATE INDEX idx_themes_active ON themes(start_date, end_date, priority)
  WHERE status != 'expired';

-- ============================================================
-- AUDIT LOG
-- ============================================================
CREATE TABLE audit_log (
  id          BIGSERIAL PRIMARY KEY,
  user_id     UUID REFERENCES users(id),
  action      TEXT NOT NULL,
  entity      TEXT NOT NULL,
  entity_id   TEXT,
  old_value   JSONB,
  new_value   JSONB,
  ip_address  INET,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_entity ON audit_log(entity, entity_id);
CREATE INDEX idx_audit_log_user ON audit_log(user_id, created_at DESC);
