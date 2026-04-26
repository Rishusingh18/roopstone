import Link from "next/link";
import Ornament from "./Ornament";
import Reveal from "./Reveal";

export interface FeatureItem {
  title: string;
  text: string;
  image?: string;
}

interface PublicPageProps {
  testId: string;
  eyebrow: string;
  title: React.ReactNode;
  text: string;
  image: string;
  features?: FeatureItem[];
  ctaHref?: string;
  ctaLabel?: string;
}

export default function PublicPage({ testId, eyebrow, title, text, image, features = [], ctaHref = "/book-consultation", ctaLabel = "Begin a Conversation" }: PublicPageProps) {
  return (
    <main data-testid={testId} style={{ minHeight: "100vh", background: "var(--color-background)", color: "var(--color-text)", overflow: "hidden" }}>
      <section className="section-pad-hero responsive-grid-2" style={{ minHeight: "92vh", paddingTop: "9rem" }}>
        <Reveal>
          <Ornament align="left" style={{ marginBottom: "1.4rem" }}>
            {eyebrow}
          </Ornament>
          <h1 style={{ marginBottom: "1.8rem" }}>{title}</h1>
          <p style={{ maxWidth: 620, color: "var(--color-text-secondary)", fontSize: "1.15rem", lineHeight: 1.8, marginBottom: "2rem" }}>{text}</p>
          <Link className="btn-primary" href={ctaHref}>
            {ctaLabel}
            <span className="arrow">→</span>
          </Link>
        </Reveal>
        <Reveal delay={180}>
          <div
            className="tile-radius kenburns"
            style={{
              minHeight: "68vh",
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 50px 120px rgba(30, 28, 18, 0.12)",
            }}
          />
        </Reveal>
      </section>

      {features.length > 0 && (
        <section className="section-pad" style={{ background: "var(--color-background-alt)" }}>
          <div style={{ maxWidth: 1260, margin: "0 auto" }}>
            <Reveal>
              <Ornament style={{ marginBottom: "1rem" }}>Atelier Notes</Ornament>
              <h2 style={{ textAlign: "center", marginBottom: "4rem" }}>What defines the work.</h2>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
              {features.map((feature, index) => (
                <Reveal key={feature.title} delay={index * 100}>
                  <article className="glass-panel hover-lift" style={{ minHeight: "100%", borderRadius: 18, overflow: "hidden" }}>
                    {feature.image && (
                      <div
                        style={{
                          height: 260,
                          backgroundImage: `url('${feature.image}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    )}
                    <div style={{ padding: "2rem" }}>
                      <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "0.8rem" }}>
                        0{index + 1}
                      </p>
                      <h3 style={{ marginBottom: "1rem" }}>{feature.title}</h3>
                      <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{feature.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
