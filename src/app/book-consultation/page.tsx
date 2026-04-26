import InquiryForm from "@/components/public/InquiryForm";
import Ornament from "@/components/public/Ornament";
import Reveal from "@/components/public/Reveal";

export const metadata = { title: "Book a Consultation — Roop Stone Arts" };

export default function BookConsultationPage() {
  return (
    <main data-testid="book-consultation-main" style={{ minHeight: "100vh", background: "var(--color-background)", paddingTop: "9rem" }}>
      <section className="section-pad responsive-grid-2">
        <Reveal>
          <Ornament align="left" style={{ marginBottom: "1.2rem" }}>Consultation</Ornament>
          <h1 style={{ marginBottom: "1.8rem" }}>A conversation with our atelier.</h1>
          <p style={{ maxWidth: 560, color: "var(--color-text-secondary)", fontSize: "1.15rem", lineHeight: 1.8 }}>
            Bring us a room, a ritual, a stone you love, or only a feeling. We will help shape the next step with drawings, material direction, timelines, and budget clarity.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <InquiryForm variant="consultation" source="consultation" includeProduct includeDate product="Custom marble commission" />
        </Reveal>
      </section>
    </main>
  );
}
