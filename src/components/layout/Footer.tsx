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
            <img src="/logo-transparent.png" alt="Logo" style={{ height: 44, objectFit: "contain" }} />
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
        <div>
          <h3 style={footerTitleStyle}>Social</h3>
          <ul style={{ ...footerListStyle, flexDirection: "row", gap: "1.2rem" }}>
            <li>
              <a href="https://www.instagram.com/roopstonearts/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", opacity: 0.9, transition: "opacity 0.2s" }} className="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffd9a8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/people/Roop-Stone-Arts" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", opacity: 0.9, transition: "opacity 0.2s" }} className="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffd9a8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/roop-stone-arts" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", opacity: 0.9, transition: "opacity 0.2s" }} className="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffd9a8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
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
