import Ornament from "@/components/public/Ornament";
import Reveal from "@/components/public/Reveal";
import { faqs } from "@/lib/public-data";

export default function FaqPage() {
  return (
    <main data-testid="faq-main" style={{ minHeight: "100vh", background: "var(--color-background)", paddingTop: "9rem" }}>
      <section className="section-pad">
        <Reveal>
          <Ornament style={{ marginBottom: "1.2rem" }}>FAQ</Ornament>
          <h1 style={{ textAlign: "center", marginBottom: "4rem" }}>Questions, answered.</h1>
        </Reveal>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gap: "1.2rem" }}>
          {faqs.map((item, index) => (
            <Reveal key={item.q} delay={index * 100}>
              <article className="glass-panel" style={{ borderRadius: 18, padding: "2rem" }}>
                <h3 style={{ marginBottom: "0.8rem", fontSize: "1.3rem" }}>{item.q}</h3>
                <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{item.a}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
