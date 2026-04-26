import PublicPage from "@/components/public/PublicPage";

export const metadata = { title: "How It Works — Roop Stone Arts" };

export default function HowItWorksPage() {
  return (
    <PublicPage
      testId="how-main"
      eyebrow="Process"
      title="How a Roop Stone Arts piece is born."
      text="The process is slow by design. We begin with conversation, move through measured drawings and stone selection, then let master artisans cut, carve, polish, pack, and install with the patience marble deserves."
      image="/images/products/6.jpg"
      features={[
        { title: "Consultation", text: "We understand the space, ritual, scale, material preference, timeline, and budget band.", image: "/images/products/7.jpg" },
        { title: "Design & Selection", text: "Drawings, stone options, carving depth, finish samples, and logistics are agreed before production.", image: "/images/products/3.jpg" },
        { title: "Craft & Install", text: "The atelier shapes the piece, documents progress, crates carefully, and coordinates site installation.", image: "/images/products/4.jpg" },
      ]}
    />
  );
}
