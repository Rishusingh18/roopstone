import PublicPage from "@/components/public/PublicPage";

export const metadata = { title: "About — Roop Stone Arts" };

export default function AboutPage() {
  return (
    <PublicPage
      testId="about-main"
      eyebrow="Makrana, 1988"
      title="Three decades of listening to stone."
      text="Roop Stone Arts began in the historic marble town of Makrana, where stone is not a material but a lineage. Our atelier works with architects, families, collectors, and spiritual patrons to shape marble into spaces that feel permanent, intimate, and alive."
      image="/images/products/11.jpg"
      ctaHref="/legacy-works"
      ctaLabel="View Legacy Works"
      features={[
        { title: "Rooted in Makrana", text: "Our craft is shaped by the quarry towns, temple workshops, and hand skills of Rajasthan.", image: "/images/products/1.jpg" },
        { title: "Architectural Discipline", text: "Every carving, slab, and installation is measured against proportion, light, and daily ritual.", image: "/images/products/3.jpg" },
        { title: "Modern Patronage", text: "We build for homes, hotels, collectors, and sanctuaries that need stone to carry emotional weight.", image: "/images/products/12.jpg" },
      ]}
    />
  );
}
