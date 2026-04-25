import Ornament from "./Ornament";
import Reveal from "./Reveal";

interface PageHeroProps {
  testId: string;
  eyebrow: string;
  title: React.ReactNode;
  text: string;
  image: string;
}

export default function PageHero({ testId, eyebrow, title, text, image }: PageHeroProps) {
  return (
    <main data-testid={testId} style={{ minHeight: "100vh", background: "var(--color-background)", color: "var(--color-text)", overflow: "hidden" }}>
      <section className="section-pad-hero" style={{ minHeight: "92vh", display: "grid", gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)", gap: "4vw", alignItems: "center", paddingTop: "9rem" }}>
        <Reveal>
          <Ornament align="left" style={{ marginBottom: "1.4rem" }}>{eyebrow}</Ornament>
          <h1 style={{ marginBottom: "1.8rem" }}>{title}</h1>
          <p style={{ maxWidth: 620, color: "var(--color-text-secondary)", fontSize: "1.15rem", lineHeight: 1.8 }}>{text}</p>
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
    </main>
  );
}
