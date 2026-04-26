import InquiryForm from "@/components/public/InquiryForm";
import PublicPage from "@/components/public/PublicPage";
import Reveal from "@/components/public/Reveal";

export const metadata = { title: "Sparsh — Sacred Spaces" };

export default function SparshPage() {
  return (
    <>
      <PublicPage
        testId="sparsh-main"
        eyebrow="Sacred Heritage"
        title="Sparsh. Carved sanctums for modern homes."
        text="SPARSH brings temple craft into contemporary homes through custom marble mandirs, pooja rooms, murtis, jaalis, and devotional architecture shaped with restraint and reverence."
        image="/images/products/18.jpg"
        ctaHref="/price-estimator"
        ctaLabel="Estimate a Mandir"
        features={[
          { title: "Mandirs", text: "Floor-standing, wall-mounted, and room-scale temples in Makrana and selected white marbles.", image: "/images/products/1.jpg" },
          { title: "Murtis & Pedestals", text: "Hand-carved idols, lotus plinths, and devotional supports for daily worship.", image: "/images/products/16.jpg" },
          { title: "Jaalis & Thresholds", text: "Screens, frames, borders, and sacred transitions shaped to the architecture of the home.", image: "/images/products/4.jpg" },
        ]}
      />
      <section className="section-pad" style={{ background: "var(--color-background)" }}>
        <Reveal>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <InquiryForm variant="consultation" source="consultation" includeProduct includeDate product="SPARSH Mandir" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
