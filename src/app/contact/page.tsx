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
          <div style={{ display: "grid", gap: "1.2rem", color: "var(--color-text-secondary)", marginBottom: "3.5rem" }}>
            <p><strong style={{ color: "var(--color-text)" }}>Atelier:</strong> Makrana, Rajasthan, India</p>
            <p><strong style={{ color: "var(--color-text)" }}>Email:</strong> info@roopstonearts.com</p>
            <p><strong style={{ color: "var(--color-text)" }}>WhatsApp:</strong> +91 98290 00000</p>
          </div>
          
          <div className="map-view">
            <h3 style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.2rem", color: "var(--color-text)" }}>Locate our Atelier</h3>
            <div style={{ borderRadius: "0.75rem", overflow: "hidden", border: "1px solid var(--color-border)", height: "320px", background: "var(--color-surface)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3568.171120054366!2d74.80136227544606!3d27.01426537658252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396b83b79beed517%3A0x7c3e843761487afa!2sRoop%20Stone%20Arts!5e0!3m2!1sen!2sin!4v1745690760492!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.1) contrast(1.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <InquiryForm variant="contact" source="contact_form" title="Write to the Atelier" intro="Share a brief note and we will respond with the right next step." />
        </Reveal>
      </section>
    </main>
  );
}
