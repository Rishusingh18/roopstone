import Estimator from "@/components/public/Estimator";
import Ornament from "@/components/public/Ornament";
import Reveal from "@/components/public/Reveal";

export default function PriceEstimatorPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--color-background)", paddingTop: "9rem" }}>
      <section className="section-pad">
        <Reveal>
          <Ornament style={{ marginBottom: "1.2rem" }}>Estimator</Ornament>
          <h1 style={{ maxWidth: 980, margin: "0 auto 1.8rem", textAlign: "center" }}>A guided conversation about your temple.</h1>
          <p style={{ maxWidth: 680, margin: "0 auto 4rem", color: "var(--color-text-secondary)", fontSize: "1.1rem", lineHeight: 1.8, textAlign: "center" }}>
            Choose scale, stone, carving, and finishing preferences to receive an indicative band before the atelier conversation.
          </p>
        </Reveal>
        <Estimator />
      </section>
    </main>
  );
}
