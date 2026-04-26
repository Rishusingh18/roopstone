# Roop Stone Arts — Production Backend Architecture Plan

> **Stack in use today:** Next.js 16 (App Router) · TypeScript · Vanilla CSS  
> **Core SRS files reverse-engineered from:** `estimatorConfig.ts`, `themes.ts`, `srs_dump.txt`

---

## 1. System Understanding

### Business Model
Roop Stone Arts is a **premium lead-generation platform**, not a checkout cart. Revenue is driven entirely by qualified enquiries that convert offline into custom marble projects. The platform must:

1. **Impress** — premium aesthetic that reflects 30+ years of Makrana heritage
2. **Educate** — guide visitors through product lines (IRA for modern living, SPARSH for sacred spaces)
3. **Qualify** — the Price Estimator turns visitors into high-intent leads
4. **Capture** — every micro-conversion (WhatsApp click, form submit, gallery view) feeds the CRM

### Critical Backend Systems Identified

| System | Business Criticality | SRS Evidence |
|---|---|---|
| **Estimator Engine** | 🔴 HIGHEST — primary lead-capture mechanism | `estimatorConfig.ts`, FR-multi-step form |
| **Theme/Campaign Engine** | 🔴 HIGH — Diwali traffic spikes can make/break revenue | `themes.ts`, FR-16, FR-17 |
| **Lead CRM Pipeline** | 🔴 HIGH — all conversions depend on this | SRS §3 |
| **CMS / Admin Panel** | 🟡 MEDIUM — marketing team must update without engineers | SRS §3.1 |
| **Media / Gallery** | 🟡 MEDIUM — high-res marble imagery is crucial for trust | FR-12 |

### Key Workflows

```
Visitor lands → Theme Engine serves active hero
      ↓
Browses IRA / SPARSH / Legacy Works
      ↓
Opens Price Estimator → multi-step form
      ↓
Estimator calculates indicative price range
      ↓
Lead form captured (name, phone, WhatsApp)
      ↓
Lead stored in DB → async notification fired
      ↓
Email to sales team + WhatsApp to customer
      ↓
CRM record created → sales follow-up offline
```

---

## 2. Architecture Design

### Recommended: Modular Monolith

**Not microservices. Not a flat monolith.**

**Reasoning specific to THIS SRS:**

- Traffic is bursty (festivals, not sustained like SaaS) — microservices add Kubernetes overhead for no benefit at this scale
- Team is likely small (1–3 backend devs) — microservices would fracture ownership
- The Estimator, Themes, and Leads are tightly related — a single DB transaction ensures lead + estimate are always consistent
- BUT: modules must be cleanly separated because the Estimator logic will evolve independently from CMS operations

**Future escape hatch**: The modular structure allows extracting the Estimator into a separate service later without a rewrite.

### Text-Based Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                 │
│  Next.js 16 (App Router, SSR/RSC)  ·  Vercel Edge Network          │
│  Pages: home, ira, sparsh, legacy-works, price-estimator           │
└────────────────────────────┬────────────────────────────────────────┘
                             │ HTTP / Server Actions
┌────────────────────────────▼────────────────────────────────────────┐
│                         API LAYER                                   │
│  Next.js Route Handlers (/api/*)  ·  Rate-limited by Upstash Redis  │
│  Auth middleware (JWT verification, RBAC guard)                      │
└────────┬──────────────┬───────────────┬────────────────┬────────────┘
         │              │               │                │
   ┌─────▼──────┐ ┌─────▼──────┐ ┌────▼──────┐ ┌──────▼──────┐
   │ Estimator  │ │   Leads    │ │  Themes   │ │    CMS      │
   │  Module    │ │  Module    │ │  Module   │ │   Module    │
   │            │ │            │ │           │ │             │
   │ - calculate│ │ - capture  │ │ - resolve │ │ - products  │
   │ - validate │ │ - enrich   │ │ - schedule│ │ - projects  │
   │ - config   │ │ - route    │ │ - fallback│ │ - users     │
   └─────┬──────┘ └─────┬──────┘ └────┬──────┘ └──────┬──────┘
         └──────────────┴─────────────┴────────────────┘
                                │
              ┌─────────────────▼──────────────────────┐
              │          BUSINESS LOGIC LAYER           │
              │  Shared: validation, auth, file upload   │
              │  Services: PricingService, LeadService   │
              │  Scheduler: ThemeSchedulerService        │
              └─────────┬──────────────┬────────────────┘
                        │              │
         ┌──────────────▼──┐    ┌──────▼──────────────┐
         │   PostgreSQL     │    │   Redis (Upstash)   │
         │  (Supabase)      │    │   - Active theme    │
         │  - leads         │    │   - Estimator cfg   │
         │  - estimates     │    │   - Rate limits     │
         │  - themes        │    │   - Session tokens  │
         │  - products      │    └─────────────────────┘
         │  - users/roles   │
         └──────────────────┘
                        │
         ┌──────────────▼──────────────────────────────┐
         │         ASYNC / QUEUE LAYER (BullMQ)         │
         │  - lead_notification (email + WhatsApp)      │
         │  - crm_sync (push to CRM)                    │
         │  - theme_precompute (in future)              │
         └──────────────────────────────────────────────┘
                        │
         ┌──────────────▼──────────────────────────────┐
         │              EXTERNAL INTEGRATIONS           │
         │  Resend (email) · Twilio (WhatsApp/SMS)      │
         │  Cloudinary (media)  · reCAPTCHA v3          │
         │  Google Analytics 4  · GTM                   │
         │  Google Maps API · CRM (Zoho/HubSpot)        │
         └─────────────────────────────────────────────┘
```

---

## 3. Tech Stack (Exact Choices)

### Backend Framework
**Next.js 16 Route Handlers + TypeScript** (already in use)
- Do NOT add a separate Express/NestJS server — Route Handlers are production-grade for this scale
- Use Server Actions for form mutations (lead capture, estimator submit) — eliminates separate API calls
- Server Components for CMS-driven pages — no client hydration cost

### Database
**PostgreSQL via Supabase**
- Relational model is mandatory: Leads reference Estimates, Estimates reference EstimatorConfig, Themes have FK to Campaigns
- Supabase gives Row Level Security (critical for multi-role CMS), real-time subscriptions (admin dashboard), and managed backups
- NOT MongoDB: the Estimator config has a structured schema that benefits from typed columns, not arbitrary JSON documents

### Caching
**Upstash Redis (serverless Redis)**
- Vercel-compatible, pay-per-request, no idle charges
- Cache: active theme config, estimator rules, product catalogue
- TTL-based invalidation: 5min for theme (balance freshness vs performance)

### Queue System
**BullMQ on Upstash Redis**
- Lightweight, no separate RabbitMQ/Kafka infrastructure
- Sufficient for lead notifications and CRM sync at this scale
- Dead-letter queues for failed WhatsApp/email delivery retries

### CMS Approach
**Custom Admin Panel (Next.js Admin Routes + Supabase)** — NOT a headless CMS

**Why NOT Contentful/Sanity:**
- The Estimator pricing rules (`EST_BASE_RATE_PER_SQFT`, multipliers) are DB-backed structured data — no CMS models this well
- Themes have FK relationships to DB records — a CMS would create a sync/drift problem
- Team owns the domain deeply — a custom panel means zero vendor lock-in and zero monthly CMS costs
- RLS in Supabase enforces RBAC natively without a CMS access model layer

### File Storage
**Cloudinary**
- Auto-optimization for high-res marble gallery images (WebP conversion, responsive srcset)
- Transformation URLs: resize hero images per device from a single original upload
- Signed upload URLs from the API — client uploads directly to Cloudinary (no bandwidth through our server)

### Auth
**NextAuth.js v5 (Auth.js) + JWT**
- Credentials provider for admin email/password login
- JWT stored in HttpOnly cookies (not localStorage)
- Role claim embedded in JWT payload — checked by RBAC middleware on every admin route

### Hosting
**Vercel (frontend + API) + Supabase (DB) + Upstash (Redis)**
- Vercel Edge for theme resolution (near-zero latency worldwide)
- Supabase in `ap-south-1` (Mumbai region) for minimum latency from India
- Automatic scaling during Diwali traffic spikes — no manual intervention

---

## 4. Database Design

### Schema

```sql
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
-- Seed data:
-- base_rate_per_sqft → {"value": 5000, "currency": "INR"}
-- material_multipliers → {"premium_makrana": 1.8, "standard_vietnam": 1.0, "italian_carrara": 2.2}
-- complexity_multipliers → {"minimal": 1.0, "moderate": 1.5, "intricate_heritage": 2.5}
-- temple_type_multipliers → {"wall_mounted": 1.0, "floor_standing": 1.4, "pooja_room_complete": 2.5}
-- surcharge_backlit → {"value": 15000}
-- surcharge_intl_shipping → {"value": 85000}
-- quote_band_percent → {"value": 10}  ← the ±10% band

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
  price_min             INTEGER NOT NULL,  -- in INR paise for precision
  price_max             INTEGER NOT NULL,
  config_snapshot       JSONB NOT NULL,   -- CRITICAL: snapshot of rules at time of estimate
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
  estimate_id     UUID REFERENCES estimates(id),  -- nullable, set for estimator leads
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  recaptcha_score NUMERIC(3,2),
  assigned_to     UUID REFERENCES users(id),
  crm_id          TEXT,          -- external CRM record ID after sync
  notified_at     TIMESTAMPTZ,   -- when email/WhatsApp notification was sent
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_phone ON leads(phone);  -- dedup lookup

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
  media_urls      JSONB DEFAULT '[]',   -- [{url, alt, type: 'image'|'video', order}]
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
  client_name     TEXT,          -- anonymizable
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
  start_date            TIMESTAMPTZ,   -- NULL = default/fallback theme
  end_date              TIMESTAMPTZ,
  priority              SMALLINT DEFAULT 1,
  hero_image_url        TEXT NOT NULL,
  hero_image_mobile_url TEXT,
  overlay_heading       TEXT NOT NULL,
  overlay_subheading    TEXT,
  cta_text              TEXT,
  cta_link              TEXT,
  background_color      TEXT,  -- optional CSS override
  badge_text            TEXT,  -- e.g. "Diwali Special"
  is_default            BOOLEAN DEFAULT FALSE,  -- exactly one row should be TRUE
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
  action      TEXT NOT NULL,   -- 'theme.update', 'estimator.config.update', 'lead.status.change'
  entity      TEXT NOT NULL,
  entity_id   TEXT,
  old_value   JSONB,
  new_value   JSONB,
  ip_address  INET,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_entity ON audit_log(entity, entity_id);
CREATE INDEX idx_audit_log_user ON audit_log(user_id, created_at DESC);
```

### Indexing Strategy

| Table | Index | Reason |
|---|---|---|
| `leads` | `(status)` | Admin filters by status constantly |
| `leads` | `(created_at DESC)` | Paginated lead inbox |
| `leads` | `(phone)` | Dedup check on new submissions |
| `products` | `(product_line, is_published)` | Homepage/listing queries |
| `themes` | `(start_date, end_date, priority)` | Theme resolution — called on every page load |
| `estimator_config` | `(config_key)` | Single-row lookups by key |

---

## 5. Estimator Engine Design

### Problem with the Current Implementation
`estimatorConfig.ts` is **hardcoded in the source code**. If pricing changes (marble costs spike), a developer must edit code, commit, and push. This is unacceptable at scale.

### Architecture: Config-Table + Formula Engine (Hybrid)

**The formula stays in code. The coefficients live in the database.**

This is the right tradeoff because:
- Pricing formulas are stable (area × material × complexity is unlikely to change)
- Coefficients change frequently (marble prices, seasonal promotions)
- Formulas in code = type-safe, testable, auditable via Git
- Coefficients in DB = admin-editable without a deployment

### Pricing Service

```typescript
// src/modules/estimator/EstimatorService.ts

export class EstimatorService {

  async loadConfig(): Promise<EstimatorRules> {
    // Try Redis cache first (TTL: 5 min)
    const cached = await redis.get('estimator:config');
    if (cached) return JSON.parse(cached);

    // Load from DB
    const rows = await db.query('SELECT config_key, config_value FROM estimator_config');
    const rules = rowsToRules(rows);

    await redis.set('estimator:config', JSON.stringify(rules), { ex: 300 });
    return rules;
  }

  async calculate(inputs: EstimatorInputs): Promise<EstimateResult> {
    const rules = await this.loadConfig();

    // Validate inputs
    validateInputs(inputs, rules);  // throws EstimatorValidationError

    const sqft = inputs.widthFt * inputs.heightFt;
    if (sqft < rules.minSqft || sqft > rules.maxSqft) {
      throw new EstimatorValidationError('Dimensions out of supported range');
    }

    const base = sqft * rules.baseRatePerSqft;
    const withType = base * rules.templeTypeMultipliers[inputs.templeType];
    const withMaterial = withType * rules.materialMultipliers[inputs.material];
    const withComplexity = withMaterial * rules.complexityMultipliers[inputs.complexity];

    let finalPrice = withComplexity;
    if (inputs.backlit) finalPrice += rules.surchargeBacklit;
    if (inputs.internationalShipping) finalPrice += rules.surchargeIntlShipping;

    const band = rules.quoteBandPercent / 100;

    return {
      priceMin: Math.floor(finalPrice * (1 - band)),
      priceMax: Math.floor(finalPrice * (1 + band)),
      configSnapshot: rules,  // IMMUTABLE snapshot stored with estimate
      breakdown: {            // returned to frontend for transparency
        sqft,
        basePrice: withType,
        afterMaterial: withMaterial,
        afterComplexity: withComplexity,
        surcharges: finalPrice - withComplexity
      }
    };
  }
}
```

### Input → Output Mapping

```
Inputs:
  templeType       → temple_type_multipliers[key]
  widthFt + heightFt → sqft → × base_rate_per_sqft
  material         → material_multipliers[key]
  complexity       → complexity_multipliers[key]
  backlit          → + surcharge_backlit (flat)
  intlShipping     → + surcharge_intl_shipping (flat)

Output:
  {min, max} price range in INR
  + breakdown object for display
  + configSnapshot for audit
```

### Admin: Dynamic Config Update API

```
PATCH /api/admin/estimator/config
Body: { key: "base_rate_per_sqft", value: { value: 5500, currency: "INR" } }

Flow:
1. Validate admin JWT + role (super_admin only)
2. Write to estimator_config table
3. Invalidate Redis key 'estimator:config'
4. Write audit_log record
5. Return updated config
```

### Edge Cases

| Case | Handling |
|---|---|
| Width/Height = 0 | Input validation returns 400 before calculation |
| Extremely large dimensions (>50 sqft) | Capped with a "contact us" message, no price shown |
| Config key missing from DB | Fallback to hardcoded defaults, alert Sentry |
| Redis down | Graceful fallback: load directly from DB (slower but correct) |
| Lead submit without estimate | `estimate_id` is nullable on leads table — allowed |
| Concurrent config update | `updated_at` timestamp + optimistic lock at DB level |

---

## 6. Theme & Campaign Engine

### Problem with the Current Implementation
`themes.ts` is hardcoded. Every Diwali, someone edits the source file. The Diwali 2026 theme is already in code waiting for 2025 Diwali — wrong architecture.

### Database-Driven Scheduler

**Resolution algorithm** (runs on every homepage load, cached in Redis):

```typescript
async function resolveActiveTheme(): Promise<ThemeConfig> {

  // 1. Check Redis cache
  const cached = await redis.get('theme:active');
  if (cached) return JSON.parse(cached);

  // 2. Query DB for best matching theme
  const theme = await db.queryOne(`
    SELECT * FROM themes
    WHERE status IN ('scheduled', 'active')
      AND (start_date IS NULL OR start_date <= NOW())
      AND (end_date IS NULL OR end_date >= NOW())
    ORDER BY is_default ASC, priority DESC
    LIMIT 1
  `);

  const result = theme ?? await getDefaultTheme();

  // 3. Cache for 5 minutes
  await redis.set('theme:active', JSON.stringify(result), { ex: 300 });

  return result;
}
```

### Priority Resolution Logic

```
Priority  │ Condition                              │ Wins
──────────┼────────────────────────────────────────┼──────────────
10+       │ Festival campaign, active date range   │ Always first
5–9       │ Regional campaign, limited scope       │ Second
1–4       │ Seasonal/evergreen content             │ Third
1         │ Default theme (is_default=true)        │ Final fallback
```

### Cron Jobs (Vercel Cron)

```typescript
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/theme-scheduler",
      "schedule": "*/30 * * * *"   // every 30 minutes
    },
    {
      "path": "/api/cron/lead-stats",
      "schedule": "0 8 * * *"       // daily 8am report
    }
  ]
}

// Route: /api/cron/theme-scheduler
// - Transition themes from 'scheduled' → 'active' when start_date reached
// - Transition from 'active' → 'expired' when end_date passed
// - Bust Redis cache after any state change
// - Notify admin via email if a campaign goes live/expires
```

### Admin Control APIs

```
GET    /api/admin/themes              → List all themes (paginated)
POST   /api/admin/themes              → Create new theme/campaign
PATCH  /api/admin/themes/:id          → Update theme
DELETE /api/admin/themes/:id          → Soft-delete (set status = 'expired')
POST   /api/admin/themes/:id/activate → Override: force-activate immediately
POST   /api/admin/themes/preview      → Preview theme without activating
```

### Fallback Chain

```
Festival Theme (priority 10) → ACTIVE dates match?
  YES → serve it
  NO  → Seasonal Theme (priority 5) → ACTIVE?
    YES → serve it
    NO  → Default Theme (is_default=TRUE) → always exists
```

---

## 7. API Design

### REST (not GraphQL)

**Why REST:**
- Frontend is Next.js—Server Components fetch directly from the DB via server-side service layer (no API round-trip needed)
- The only true API consumers are: the admin panel, third-party CRM webhook, and mobile browsers on form submit
- GraphQL adds schema maintenance overhead for marginal benefit at this scale
- REST endpoint structure mirrors the resource model naturally (leads, themes, products)

### Public Endpoints

```
# ESTIMATOR
POST /api/estimator/calculate
Body:
{
  "templeType": "wall_mounted",
  "widthFt": 3,
  "heightFt": 5,
  "material": "premium_makrana",
  "complexity": "intricate_heritage",
  "backlit": true,
  "internationalShipping": false
}
Response 200:
{
  "success": true,
  "estimate": {
    "priceMin": 432000,
    "priceMax": 528000,
    "currency": "INR",
    "breakdown": {
      "sqft": 15,
      "basePrice": 75000,
      "afterMaterial": 135000,
      "afterComplexity": 337500,
      "surcharges": 15000
    },
    "disclaimer": "Indicative range only. Final quote after site visit."
  }
}

# LEAD CAPTURE (with estimator)
POST /api/leads
Body:
{
  "fullName": "Rajesh Kumar",
  "phone": "+919876543210",
  "email": "r@email.com",
  "city": "Mumbai",
  "message": "Need 4x6 wall-mounted for puja room",
  "source": "estimator",
  "estimateId": "uuid",
  "recaptchaToken": "token",
  "utm": { "source": "google", "medium": "cpc", "campaign": "diwali2026" }
}
Response 201:
{
  "success": true,
  "leadId": "uuid",
  "message": "We'll reach out within 24 hours. Check WhatsApp."
}

# THEME (public — called from homepage server component)
GET /api/theme/active
Response 200:
{
  "id": "diwali_2026",
  "heroImageUrl": "https://res.cloudinary.com/.../diwali-hero.webp",
  "heroImageMobileUrl": "...",
  "overlayHeading": "Illuminate Your Devotion",
  "overlaySubheading": "Exclusive Diwali Collections",
  "ctaText": "Explore Diwali Collection",
  "ctaLink": "/sparsh",
  "badgeText": "Diwali Special"
}

# PRODUCTS (public)
GET /api/products?line=sparsh&page=1&limit=12
GET /api/products/:slug

# PROJECTS (Legacy Works — public)
GET /api/projects?featured=true
GET /api/projects/:slug
```

### Admin Endpoints (JWT required)

```
# AUTH
POST /api/auth/login       → returns JWT in HttpOnly cookie
POST /api/auth/logout
GET  /api/auth/me

# ADMIN — LEADS
GET    /api/admin/leads                   → paginated, filterable
GET    /api/admin/leads/:id
PATCH  /api/admin/leads/:id/status
POST   /api/admin/leads/:id/assign

# ADMIN — ESTIMATOR CONFIG
GET    /api/admin/estimator/config
PATCH  /api/admin/estimator/config        → updates one key, busts cache

# ADMIN — THEMES
GET    /api/admin/themes
POST   /api/admin/themes
PATCH  /api/admin/themes/:id
DELETE /api/admin/themes/:id

# ADMIN — PRODUCTS / PROJECTS
GET    /api/admin/products
POST   /api/admin/products
PATCH  /api/admin/products/:id
DELETE /api/admin/products/:id
(same pattern for /projects)

# ADMIN — USERS (super_admin only)
GET    /api/admin/users
POST   /api/admin/users
PATCH  /api/admin/users/:id/role
DELETE /api/admin/users/:id
```

---

## 8. Authentication & RBAC

### Roles & Permissions Matrix

| Permission | super_admin | editor | marketing |
|---|---|---|---|
| View leads | ✅ | ❌ | ✅ |
| Update lead status | ✅ | ❌ | ✅ |
| Create/edit products | ✅ | ✅ | ❌ |
| Create/edit projects | ✅ | ✅ | ❌ |
| Manage themes/campaigns | ✅ | ✅ | ❌ |
| Edit estimator config | ✅ | ❌ | ❌ |
| Manage users | ✅ | ❌ | ❌ |
| View audit log | ✅ | ❌ | ❌ |
| Export leads CSV | ✅ | ❌ | ✅ |

### JWT Payload

```typescript
interface JWTPayload {
  sub: string;      // user UUID
  email: string;
  role: 'super_admin' | 'editor' | 'marketing';
  iat: number;
  exp: number;      // 8-hour expiry for admin sessions
}
```

### RBAC Middleware

```typescript
// src/lib/auth/rbac.ts

export function requireRole(...allowedRoles: UserRole[]) {
  return async (req: NextRequest) => {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyJWT(token);
    if (!allowedRoles.includes(payload.role)) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    return payload;  // pass to handler
  };
}

// Usage in route handler:
export async function PATCH(req: NextRequest, { params }) {
  const authResult = await requireRole('super_admin')(req);
  if (authResult instanceof Response) return authResult;  // unauthorized
  
  // proceed with handler...
}
```

### Security Hardening
- bcrypt (cost factor 12) for password hashing
- reCAPTCHA v3 score threshold 0.5 for lead submission
- Rate limiting: 5 login attempts / 15 min per IP (Upstash RateLimit)
- CSRF protection via SameSite=Strict cookie attribute
- All admin routes behind `/api/admin/*` prefix with global middleware guard
- Supabase RLS policies double-enforce DB-level access even if middleware is bypassed

---

## 9. Scalability & Performance

### Caching Strategy

| Data | Cache Key | TTL | Invalidation Trigger |
|---|---|---|---|
| Active theme | `theme:active` | 5 min | Theme update/cron |
| Estimator rules | `estimator:config` | 5 min | Config PATCH |
| Product catalogue | `products:{line}` | 30 min | Product CRUD |
| Projects (featured) | `projects:featured` | 30 min | Project CRUD |
| Lead stats | `leads:stats:daily` | 1 hour | Cron refresh |

### Festival Traffic Spike Strategy

Diwali/Navratri traffic can surge 5–10× overnight. Mitigation:

1. **Vercel auto-scales** — no server management needed; serverless functions scale horizontally
2. **Redis cache absorbs DB load** — the theme resolution query (most frequent) is cached at edge
3. **DB connection pooling** — Supabase uses PgBouncer; set pool size to 10 per serverless function instance
4. **Static asset pre-generation** — product pages use Next.js `generateStaticParams` (ISR)
5. **Pre-warm cache** — cron job at campaign start date forces Redis population before visitors arrive
6. **Rate limiting on estimator API** — 10 calculations per IP per minute (prevents scraping/abuse)

### CDN Strategy

```
Vercel Edge Network
├── Static assets (.js, .css, fonts)   → Immutable cache, 1 year
├── Product images (Cloudinary CDN)    → Transform at edge, 30 days
├── Hero images (Cloudinary CDN)       → Per-campaign, 1 hour
└── API responses (Route Handlers)     → Cache-Control: s-maxage=60
```

### DB Scaling

- Start: Single Supabase instance (handles ~10K concurrent connections via PgBouncer)
- Read-heavy scaling: Supabase read replicas for product/project listing
- Estimator writes: low-volume (lead submit), no scaling concern
- Long-term: Timescale extension for time-series lead analytics (if needed)

---

## 10. Asynchronous Processing

### Queue Design (BullMQ on Upstash Redis)

```
QUEUES:
├── lead_notifications  (concurrency: 5)
│   ├── Job: email_to_sales (Resend → sales@roopstonearts.com)
│   ├── Job: whatsapp_to_customer (Twilio → customer phone)
│   └── Job: sms_fallback (if WhatsApp fails after 2 retries)
│
├── crm_sync  (concurrency: 2)
│   └── Job: upsert_lead_to_crm (Zoho/HubSpot API)
│
└── analytics_events  (concurrency: 3)
    └── Job: push_lead_event_to_ga4 (Measurement Protocol)
```

### Lead Processing Flow

```
POST /api/leads
  ↓
1. Validate + reCAPTCHA check (SYNC — reject spam immediately)
2. Save lead + estimate to DB (SYNC — must succeed before 201)
3. Enqueue lead_notifications job (ASYNC — non-blocking)
4. Enqueue crm_sync job (ASYNC — non-blocking)
5. Return 201 to client
   ↓
   [Background: BullMQ workers]
6. Send Resend email to sales team
7. Send WhatsApp message to customer via Twilio
8. Sync to CRM, store crm_id back on lead record
9. Update lead.notified_at timestamp
```

### Retry Policy

```typescript
const leadNotificationJob = {
  attempts: 3,
  backoff: { type: 'exponential', delay: 2000 },
  removeOnComplete: { age: 86400 },   // keep 24h
  removeOnFail: { age: 604800 }        // keep 7 days for debug
};
```

---

## 11. Integrations

### reCAPTCHA v3 (Spam Protection)

```
Flow:
1. Client executes grecaptcha.execute('SITE_KEY', {action: 'submit_lead'})
2. Token included in POST /api/leads body
3. Server POSTs token to Google: https://www.google.com/recaptcha/api/siteverify
4. Receives score (0.0–1.0)
5. Score < 0.4 → reject with 403 and log for review
6. Score 0.4–0.7 → accept but flag lead as 'suspected_bot' in DB
7. Score > 0.7 → clean lead, normal processing
```

### WhatsApp (Twilio API)

```
Two touchpoints:
1. FLOATING BUTTON (FR-4): Static WhatsApp deep link → wa.me/919XXXXXXXXX
   No API needed — client-side only

2. LEAD CONFIRMATION: Server-side Twilio API
   POST https://api.twilio.com/2010-04-01/Accounts/{SID}/Messages
   {
     From: "whatsapp:+14155238886",
     To: "whatsapp:+91{customer_phone}",
     Body: "Hi {name}, thank you for your interest in Roop Stone Arts.
            Your estimate is ready: ₹{min}–₹{max}. Our team will call 
            you within 24 hours. – Team Roop Stone"
   }
```

### Resend (Email)

```
Recipients:
- sales@roopstonearts.com → new lead notification with full estimate details
- customer email (if provided) → confirmation email with PDF estimate

Template engine: React Email for HTML templates
Provider: Resend (better deliverability than SendGrid for Indian domains)
```

### Google Analytics 4 + GTM

```
Client-side: GTM container loads GA4 tag
Server-side: Measurement Protocol for server events (not blocked by ad-blockers)

Key events tracked:
- estimator_started
- estimator_completed { value: priceMax, currency: "INR" }
- lead_submitted { source: "estimator"|"form" }
- whatsapp_click
- gallery_view { product_slug }
- page_view (automatic via GTM)
```

### Google Maps API

```
Usage: Show showroom/factory location on About/Contact page
Implementation: Static Maps API (no JS SDK overhead)
  <img src="https://maps.googleapis.com/maps/api/staticmap?
    center=Makrana,Rajasthan&zoom=14&size=600x300&key=API_KEY" />
```

### CRM (Zoho CRM recommended for Indian SMBs)

```
Integration Type: Webhook push from BullMQ crm_sync queue

Lead → Zoho mapping:
  full_name     → Last Name
  phone         → Phone
  email         → Email
  city          → City
  source        → Lead Source
  message       → Description
  estimate data → Custom Fields: Temple Type, Material, Est. Budget

On success: store zoho_lead_id in leads.crm_id
On failure: retry 3× then alert super_admin via email
```

---

## 12. Deployment Architecture

### Docker Setup

```dockerfile
# Dockerfile (single-stage for Next.js on Vercel — not needed)
# For self-hosted fallback or BullMQ workers:

FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production

FROM base AS worker
COPY src/workers ./workers
CMD ["node", "workers/index.js"]
```

### vercel.json

```json
{
  "regions": ["bom1"],
  "crons": [
    { "path": "/api/cron/theme-scheduler", "schedule": "*/30 * * * *" },
    { "path": "/api/cron/lead-digest", "schedule": "0 8 * * 1-6" }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000" }
      ]
    }
  ]
}
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test

  deploy:
    needs: validate
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Environment Separation

| Environment | DB | Redis | Domain |
|---|---|---|---|
| `development` | Supabase (dev project) | Upstash (dev DB) | localhost:3000 |
| `preview` | Supabase (dev project) | Upstash (dev DB) | pr-{n}.vercel.app |
| `production` | Supabase (prod project) | Upstash (prod DB) | roopstonearts.com |

### Infrastructure Layout

```
roopstonearts.com (Vercel)
├── Next.js App (SSR + RSC + Route Handlers)
├── Edge Middleware (auth check, rate limit headers)
└── Cron Jobs (theme-scheduler, lead-digest)

Supabase (Mumbai ap-south-1)
├── PostgreSQL 15
├── PgBouncer (connection pooler)
├── Storage (backup overflow)
└── Auth (unused — we use NextAuth directly)

Upstash Redis (Mumbai)
├── Cache layer (themes, estimator config, products)
├── BullMQ queue backend
└── Rate limiting store

Cloudinary (CDN)
├── Product images
├── Project gallery
└── Theme hero images

External APIs
├── Resend (email)
├── Twilio (WhatsApp/SMS)
└── Zoho CRM
```

---

## 13. Folder Structure (Production-Grade)

```
c:\roopstone\
├── src/
│   ├── app/                           # Next.js App Router pages
│   │   ├── (public)/                  # Public-facing pages
│   │   │   ├── page.tsx               # Homepage (uses ThemeService)
│   │   │   ├── ira/
│   │   │   ├── sparsh/
│   │   │   ├── legacy-works/
│   │   │   ├── price-estimator/
│   │   │   └── book-consultation/
│   │   │
│   │   ├── (admin)/                   # Admin panel (separate layout)
│   │   │   ├── layout.tsx             # Admin shell + auth guard
│   │   │   ├── dashboard/
│   │   │   ├── leads/
│   │   │   ├── products/
│   │   │   ├── projects/
│   │   │   ├── themes/
│   │   │   └── settings/
│   │   │
│   │   └── api/                       # Route Handlers
│   │       ├── auth/
│   │       │   ├── login/route.ts
│   │       │   ├── logout/route.ts
│   │       │   └── me/route.ts
│   │       │
│   │       ├── estimator/
│   │       │   └── calculate/route.ts
│   │       │
│   │       ├── leads/
│   │       │   └── route.ts           # POST /api/leads
│   │       │
│   │       ├── theme/
│   │       │   └── active/route.ts    # GET /api/theme/active
│   │       │
│   │       ├── products/
│   │       │   ├── route.ts
│   │       │   └── [slug]/route.ts
│   │       │
│   │       ├── admin/                 # Auth-guarded admin endpoints
│   │       │   ├── leads/
│   │       │   ├── themes/
│   │       │   ├── products/
│   │       │   ├── projects/
│   │       │   ├── estimator/
│   │       │   └── users/
│   │       │
│   │       └── cron/
│   │           ├── theme-scheduler/route.ts
│   │           └── lead-digest/route.ts
│   │
│   ├── modules/                       # Business logic (decoupled from HTTP)
│   │   ├── estimator/
│   │   │   ├── EstimatorService.ts    # Core calculation logic
│   │   │   ├── estimator.types.ts
│   │   │   ├── estimator.validation.ts
│   │   │   └── estimator.test.ts
│   │   │
│   │   ├── leads/
│   │   │   ├── LeadService.ts
│   │   │   ├── lead.types.ts
│   │   │   └── lead.validation.ts
│   │   │
│   │   ├── themes/
│   │   │   ├── ThemeService.ts
│   │   │   ├── theme.scheduler.ts
│   │   │   └── theme.types.ts
│   │   │
│   │   ├── products/
│   │   │   └── ProductService.ts
│   │   │
│   │   ├── projects/
│   │   │   └── ProjectService.ts
│   │   │
│   │   └── cms/
│   │       ├── MediaService.ts        # Cloudinary upload management
│   │       └── AuditService.ts
│   │
│   ├── lib/                           # Shared infrastructure
│   │   ├── db/
│   │   │   ├── client.ts             # Supabase client (server-side)
│   │   │   └── migrations/           # SQL migration files
│   │   │
│   │   ├── redis/
│   │   │   └── client.ts             # Upstash Redis client
│   │   │
│   │   ├── queue/
│   │   │   ├── client.ts             # BullMQ setup
│   │   │   └── workers/
│   │   │       ├── lead-notification.worker.ts
│   │   │       └── crm-sync.worker.ts
│   │   │
│   │   ├── auth/
│   │   │   ├── jwt.ts
│   │   │   ├── rbac.ts
│   │   │   └── middleware.ts
│   │   │
│   │   ├── integrations/
│   │   │   ├── resend.ts
│   │   │   ├── twilio.ts
│   │   │   ├── zoho.ts
│   │   │   ├── recaptcha.ts
│   │   │   └── cloudinary.ts
│   │   │
│   │   └── utils/
│   │       ├── errors.ts             # Custom error classes
│   │       └── response.ts          # Standard API response helpers
│   │
│   ├── components/                    # React UI components (existing)
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   │
│   └── data/                          # DEPRECATED — move to DB
│       ├── estimatorConfig.ts         # → replaced by EstimatorService.loadConfig()
│       └── themes.ts                  # → replaced by ThemeService.resolveActive()
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_seed_estimator_config.sql
│   │   └── 003_seed_default_theme.sql
│   └── seed.ts
│
├── emails/                            # React Email templates
│   ├── LeadNotification.tsx
│   └── LeadConfirmation.tsx
│
├── .env.local                         # (gitignored)
├── .env.example
└── vercel.json
```

---

## 14. Development Roadmap

### Phase 1 — Foundation (Weeks 1–3) ✅ COMPLETE
**Goal: Core backend infra + CMS operational**

- [x] Set up Supabase project (Mumbai), run migrations 001–003
- [x] Set up Upstash Redis
- [x] Implement NextAuth.js v5 with credentials + RBAC middleware
- [x] Admin panel shell: layout, login page, dashboard stub
- [x] Products CRUD (admin) + public listing API
- [x] Projects CRUD (admin) + Legacy Works listing
- [x] Cloudinary integration for image uploads
- [x] Audit log integration on all admin mutations

**Deliverable:** Marketing team can manage products/projects independently

---

### Phase 2 — Estimator Engine (Weeks 4–5) 🏗️ IN PROGRESS
**Goal: Pricing engine fully DB-driven**

- [ ] Migrate `estimatorConfig.ts` → `estimator_config` DB table
- [ ] Implement `EstimatorService` with Redis caching
- [ ] Build POST `/api/estimator/calculate` with validation
- [ ] Admin UI: Estimator Config editor (key-value editor with labels)
- [ ] Lead capture: POST `/api/leads`, reCAPTCHA v3 check
- [ ] BullMQ queue setup + Resend email notification
- [ ] Twilio WhatsApp notification for lead confirmation
- [ ] Admin: Lead inbox view (table + status updates)

**Deliverable:** Full estimator → lead pipeline operational

---

### Phase 3 — Theme/Campaign Engine (Weeks 6–7)
**Goal: Marketing team controls homepage independently**

- [ ] Migrate `themes.ts` → `themes` DB table
- [ ] Implement `ThemeService.resolveActive()` with Redis caching
- [ ] Vercel Cron: `theme-scheduler` job
- [ ] Admin UI: Theme manager (create, schedule, preview, activate)
- [ ] Cloudinary hero image upload in theme editor
- [ ] Zoho CRM integration (crm_sync BullMQ worker)
- [ ] Google Analytics 4 Measurement Protocol events

**Deliverable:** Marketing team owns campaigns, no engineer needed for Diwali

---

### Phase 4 — Scaling & Optimization (Week 8+)
**Goal: Production-hardened, performance-certified**

- [ ] Load test peak Diwali scenario (k6 — 500 concurrent users)
- [ ] Supabase read replica for product/project queries
- [ ] ISR for product/project pages (`revalidate: 1800`)
- [ ] Core Web Vitals audit + optimize LCP hero images
- [ ] Admin: Lead export CSV + daily digest email
- [ ] Sentry error monitoring
- [ ] Security review: penetration test admin endpoints
- [ ] Runbooks for common ops tasks (deploy, rollback, config update)

---

## 15. Risks & Engineering Decisions

### Risk 1: Estimator Config Drift
**Risk:** Admin edits pricing in DB; old estimates in `leads` table reflect old prices. New admin wonders why quotes look different.

**Mitigation:** `estimates.config_snapshot` stores the exact rules used at calculation time. Estimates are immutable. Admin UI shows "calculated with config version X on DD/MM/YY."

---

### Risk 2: Theme Cache Stale During Festival Launch
**Risk:** Admin activates Diwali theme at 12:00 AM. Redis cache still serves old theme until 5-min TTL expires.

**Mitigation:** Theme activate API immediately busts `theme:active` Redis key. Cache is never the source of truth, only an acceleration layer. Cron job also refreshes every 30 min as a belt-and-suspenders approach.

---

### Risk 3: WhatsApp Delivery Failures
**Risk:** Twilio sandbox has approval requirements; production Twilio needs Business Account approval.

**Mitigation:** Implement SMS as fallback in BullMQ retry chain. WhatsApp attempt → failure → SMS via Twilio → failure → email to sales team. `leads.notified_at` is only set after at least one successful contact.

---

### Risk 4: CMS Overgrowth
**Risk:** Custom admin panel starts simple and becomes a product in itself.

**Mitigation:** Strict scope: CMS is read/write for Products, Projects, Themes, Estimator Config, Leads ONLY. No blog, no multi-language, no versioning in Phase 1. Use Supabase dashboard as a "superadmin fallback" for anything outside scope.

---

### Risk 5: reCAPTCHA False Positives (India)
**Risk:** Indian mobile users on slow networks sometimes score < 0.5 and get incorrectly blocked.

**Mitigation:** Set threshold to 0.3 (not 0.5). Auto-flag as `suspected_bot` instead of hard-reject for scores 0.3–0.5. Sales team reviews flagged leads manually. Never silently discard a potential high-value lead.

---

### Risk 6: Formula Changes, Not Just Config Changes
**Risk:** Business decides to switch from area-based to room-count-based pricing. No config change can handle this.

**Mitigation:** All breaking formula changes require a code migration. Document this clearly. Add a `formula_version` field to `estimator_config`. When version increments, mark old estimates with old version for accurate audit. Plan for this in Phase 4 if needed.

---

### Key Engineering Decisions Summary

| Decision | Choice | Alternative Rejected | Reason |
|---|---|---|---|
| Architecture | Modular Monolith | Microservices | Right-sized for team + traffic |
| DB | PostgreSQL (Supabase) | MongoDB | Relational integrity critical for leads/estimates |
| CMS | Custom Admin Panel | Contentful/Sanity | Estimator config is structured, not content |
| Queue | BullMQ + Redis | RabbitMQ / Kafka | Zero extra infra, sufficient for this scale |
| Auth | NextAuth.js v5 | Supabase Auth | More control over JWT claims + cookie strategy |
| Email | Resend | SendGrid | Better developer experience + React Email support |
| Storage | Cloudinary | S3 | Auto CDN + image transforms out of the box |
| Analytics | GA4 + Measurement Protocol | Mixpanel | Budget-optimal, GTM already in plan |

---

*Generated for: Roop Stone Arts — Backend Architecture v1.0*  
*Based on: SRS dump + estimatorConfig.ts + themes.ts (April 2026)*
