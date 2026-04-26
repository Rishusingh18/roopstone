import CreationsBrowser from "@/components/public/CreationsBrowser";
import Ornament from "@/components/public/Ornament";
import Reveal from "@/components/public/Reveal";
import { creations } from "@/lib/public-data";

export default function CreationsPage() {
  return (
    <main data-testid="creations-main" style={{ minHeight: "100vh", background: "var(--color-background)", paddingTop: "9rem" }}>
      <section className="section-pad">
        <Reveal>
          <Ornament style={{ marginBottom: "1.2rem" }}>Living Archive</Ornament>
          <h1 style={{ maxWidth: 900, margin: "0 auto 1.8rem", textAlign: "center" }}>Our Creations — a living archive.</h1>
          <p style={{ maxWidth: 680, margin: "0 auto 4rem", color: "var(--color-text-secondary)", fontSize: "1.1rem", lineHeight: 1.8, textAlign: "center" }}>
            Browse temples, murtis, slabs, artifacts, and architectural stone pieces from the atelier.
          </p>
        </Reveal>
        <CreationsBrowser creations={creations} />
      </section>
    </main>
  );
}
