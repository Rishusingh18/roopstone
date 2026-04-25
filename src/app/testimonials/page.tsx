import Ornament from "@/components/public/Ornament";
import Reveal from "@/components/public/Reveal";
import { testimonials } from "@/lib/public-data";

export const metadata = { title: "Testimonials — Roop Stone Arts" };

export default function TestimonialsPage() {
  return (
    <main data-testid="testimonials-main" style={{ minHeight: "100vh", background: "var(--color-background)", paddingTop: "9rem" }}>
      <section className="section-pad">
        <Reveal>
          <Ornament style={{ marginBottom: "1.2rem" }}>Patrons</Ornament>
          <h1 style={{ maxWidth: 980, margin: "0 auto 4rem", textAlign: "center" }}>The homes and halls that live with our work.</h1>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 120}>
              <blockquote className="glass-panel motif-corner" style={{ position: "relative", minHeight: 280, borderRadius: 20, padding: "2.4rem" }}>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "1.15rem", lineHeight: 1.8, marginBottom: "2rem" }}>“{item.quote}”</p>
                <p className="brand-subtitle" style={{ color: "var(--color-royal)" }}>{item.name} · {item.place}</p>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
