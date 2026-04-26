import InquiryForm from "@/components/public/InquiryForm";
import Ornament from "@/components/public/Ornament";
import Reveal from "@/components/public/Reveal";

export const metadata = { title: "Contact — Roop Stone Arts" };

export default function ContactPage() {
  return (
    <main data-testid="contact-main" style={{ minHeight: "100vh", background: "var(--color-background)", paddingTop: "9rem" }}>
      <section className="section-pad responsive-grid-2">
        <Reveal>
          <Ornament align="left" style={{ marginBottom: "1.2rem" }}>Makrana Atelier</Ornament>
          <h1 style={{ marginBottom: "1.8rem" }}>Find us where marble is born.</h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "1.15rem", lineHeight: 1.8, marginBottom: "2rem" }}>
            Visit, call, or begin with a note. Our consultants will help translate your temple, artwork, slab, or restoration idea into the right first conversation.
          </p>
          <div style={{ display: "grid", gap: "1rem", color: "var(--color-text-secondary)" }}>
            <p><strong style={{ color: "var(--color-text)" }}>Atelier:</strong> Makrana, Rajasthan, India</p>
            <p><strong style={{ color: "var(--color-text)" }}>Email:</strong> info@roopstonearts.com</p>
            <p><strong style={{ color: "var(--color-text)" }}>WhatsApp:</strong> +91 98290 00000</p>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <InquiryForm variant="contact" source="contact_form" title="Write to the Atelier" intro="Share a brief note and we will respond with the right next step." />
        </Reveal>
      </section>
    </main>
  );
}
