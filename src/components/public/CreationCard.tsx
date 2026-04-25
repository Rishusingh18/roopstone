import Link from "next/link";
import type { Creation } from "@/lib/public-data";

interface CreationCardProps {
  creation: Creation;
  index?: number;
}

export default function CreationCard({ creation, index = 0 }: CreationCardProps) {
  return (
    <Link data-testid={`creation-${creation.id}`} href={`/creations/${creation.id}`} style={{ display: "block", textDecoration: "none" }}>
      <div
        className="tile-radius hover-lift"
        style={{
          height: 360,
          backgroundImage: `url('${creation.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: "1rem",
          boxShadow: "0 14px 40px rgba(30, 28, 18, 0.08)",
        }}
      />
      <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "0.4rem" }}>
        {creation.category} · {creation.material}
      </p>
      <h3 style={{ fontSize: "1.15rem", marginBottom: "0.3rem" }}>{creation.name}</h3>
      <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>{creation.price}</p>
    </Link>
  );
}
