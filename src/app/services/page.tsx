import PublicPage from "@/components/public/PublicPage";

export const metadata = { title: "Services — Roop Stone Arts" };

export default function ServicesPage() {
  return (
    <PublicPage
      testId="services-main"
      eyebrow="Ateliers & Services"
      title="From sketch to sanctum — we carry it all."
      text="Our studio guides the full journey: stone selection, concept sketches, carving, finishing, crating, site coordination, and installation. The result is a single accountable atelier from first idea to final polish."
      image="/images/products/10.jpg"
      features={[
        { title: "Custom Mandirs", text: "SPARSH temples, pooja walls, sanctums, murtis, jaalis, and devotional architectural details.", image: "/images/products/18.jpg" },
        { title: "IRA Artworks", text: "Limited sculptural pieces, stone furniture, collector objects, and modern marble statements.", image: "/images/products/12.jpg" },
        { title: "Architectural Stone", text: "Slabs, inlays, wall panels, thresholds, basins, consoles, restoration, and project installation.", image: "/images/products/15.jpg" },
      ]}
    />
  );
}
