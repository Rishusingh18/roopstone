import InquiryForm from "@/components/public/InquiryForm";
import PublicPage from "@/components/public/PublicPage";
import Reveal from "@/components/public/Reveal";

export const metadata = { title: "IRA — Sculpted Stillness" };

export default function IraPage() {
  return (
    <>
      <PublicPage
        testId="ira-main"
        eyebrow="Modern Reverence"
        title="IRA. Sculpted stillness, modern reverence."
        text="IRA is the atelier's sculptural collection: marble objects, furniture, and quiet monuments that treat stone as modern art without severing it from geological memory."
        image="/images/products/12.jpg"
        ctaHref="/creations"
        ctaLabel="Explore IRA"
        features={[
          { title: "Limited Artworks", text: "Singular pieces carved for collectors, residences, galleries, and contemplative public rooms.", image: "/images/products/6.jpg" },
          { title: "Stone Furniture", text: "Tables, consoles, and plinths where functional form keeps the weight of sculpture.", image: "/images/products/9.jpg" },
          { title: "Commissioned Forms", text: "Bespoke objects guided by architecture, stone personality, and the collector's room.", image: "/images/products/17.jpg" },
        ]}
      />
      <section className="section-pad" style={{ background: "var(--color-background)" }}>
        <Reveal>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <InquiryForm variant="quote" source="gallery" title="Commission an IRA Work" intro="Tell us about the room, stone mood, and scale you imagine." />
          </div>
        </Reveal>
      </section>
    </>
  );
}
