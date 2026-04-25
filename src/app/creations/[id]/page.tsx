import { notFound } from "next/navigation";
import Link from "next/link";
import InquiryForm from "@/components/public/InquiryForm";
import Ornament from "@/components/public/Ornament";
import Reveal from "@/components/public/Reveal";
import { creations, getCreation } from "@/lib/public-data";

interface CreationDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return creations.map((creation) => ({ id: creation.id }));
}

export async function generateMetadata({ params }: CreationDetailPageProps) {
  const { id } = await params;
  const creation = getCreation(id);
  return { title: creation ? `${creation.name} — Roop Stone Arts` : "Creation — Roop Stone Arts" };
}

export default async function CreationDetailPage({ params }: CreationDetailPageProps) {
  const { id } = await params;
  const creation = getCreation(id);
  if (!creation) notFound();

  return (
    <main data-testid="creation-detail-main" style={{ minHeight: "100vh", background: "var(--color-background)", paddingTop: "9rem", overflow: "hidden" }}>
      <section className="section-pad responsive-grid-2">
        <Reveal>
          <Ornament align="left" style={{ marginBottom: "1.2rem" }}>
            {creation.collection} · {creation.category}
          </Ornament>
          <h1 style={{ marginBottom: "1.6rem" }}>{creation.name}</h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "1.15rem", lineHeight: 1.8, marginBottom: "2rem" }}>{creation.story}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginBottom: "2rem" }}>
            <span className="chip">{creation.material}</span>
            <span className="chip">{creation.price}</span>
          </div>
          <Link className="btn-ghost" href="/creations">← Back to Archive</Link>
        </Reveal>
        <Reveal delay={180}>
          <div className="tile-radius kenburns" style={{ minHeight: "72vh", backgroundImage: `url('${creation.image}')`, backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 50px 120px rgba(30,28,18,0.12)" }} />
        </Reveal>
      </section>

      <section className="section-pad" style={{ background: "var(--color-background-alt)" }}>
        <div className="responsive-grid-2">
          <Reveal>
            <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "1rem" }}>Details</p>
            <h2 style={{ marginBottom: "2rem" }}>Measured for permanence.</h2>
            <div style={{ display: "grid", gap: "1rem" }}>
              {creation.specs.map((spec) => (
                <div key={spec} className="glass-panel" style={{ borderRadius: 14, padding: "1.1rem 1.3rem", color: "var(--color-text-secondary)" }}>
                  {spec}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={180}>
            <InquiryForm variant="quote" source="gallery" includeProduct product={creation.name} title="Request This Piece" intro="Share your site, scale, and timeline. We will respond with availability and next steps." />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
