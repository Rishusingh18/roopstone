import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #5a3e1a 0%, #3d2810 100%)",
        color: "#fdf7e8",
        padding: "5rem 5vw 2rem",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "3rem",
          margin: "0 auto 4rem",
          maxWidth: 1400,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <img src="/logo.png" alt="Logo" style={{ height: 56, filter: "brightness(0) invert(1)" }} />
            <div style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.2em", fontSize: "1rem" }}>
              ROOP
              <br />
              STONE ARTS
            </div>
          </div>
          <p style={{ opacity: 0.85, lineHeight: 1.7, fontSize: "0.92rem" }}>
            Where Stones Become Poetry. Three decades of marble mastery from Makrana, Rajasthan.
          </p>
        </div>
        <FooterColumn
          title="Explore"
          links={[
            ["About", "/about-us"],
            ["Sparsh", "/sparsh"],
            ["IRA", "/ira"],
            ["Creations", "/creations"],
            ["Estimator", "/price-estimator"],
            ["Journal", "/journal"],
            ["Contact", "/contact"],
          ]}
        />
        <FooterColumn
          title="Ateliers & Services"
          links={[
            ["Our Services", "/services"],
            ["How It Works", "/how-it-works"],
            ["Legacy Works", "/legacy-works"],
            ["Testimonials", "/testimonials"],
            ["FAQ", "/faq"],
          ]}
        />
        <div>
          <h3 style={footerTitleStyle}>Connect</h3>
          <ul style={footerListStyle}>
            <li>
              <Link style={{ color: "#ffd9a8" }} href="/book-consultation">
                Book a Consultation →
              </Link>
            </li>
            <li>
              <a href="mailto:info@roopstonearts.com">info@roopstonearts.com</a>
            </li>
            <li>Makrana, Rajasthan, India</li>
            <li>
              <a href="https://wa.me/919829000000" target="_blank" rel="noopener noreferrer">
                WhatsApp us →
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "2rem", textAlign: "center", opacity: 0.7, fontSize: "0.82rem", maxWidth: 1400, margin: "0 auto" }}>
        <p>© 2026 Roop Stone Arts. All rights reserved. Crafted with reverence in Makrana.</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <h3 style={footerTitleStyle}>{title}</h3>
      <ul style={footerListStyle}>
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const footerTitleStyle: React.CSSProperties = {
  color: "#fff",
  marginBottom: "1.2rem",
  fontFamily: "var(--font-body)",
  fontSize: "0.85rem",
  fontWeight: 600,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
};

const footerListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
  listStyle: "none",
  opacity: 0.88,
  fontSize: "0.92rem",
};
