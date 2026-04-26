"use client";

import { useMemo, useState } from "react";
import CreationCard from "./CreationCard";
import type { Creation, CreationCategory } from "@/lib/public-data";

const categories: Array<"All" | CreationCategory> = ["All", "Temple", "Murti", "Slab", "Artifact", "Architectural"];

interface CreationsBrowserProps {
  creations: Creation[];
}

export default function CreationsBrowser({ creations }: CreationsBrowserProps) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [material, setMaterial] = useState("All");
  const [search, setSearch] = useState("");

  const materials = useMemo(() => ["All", ...Array.from(new Set(creations.map((item) => item.material)))], [creations]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return creations.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesMaterial = material === "All" || item.material === material;
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.short.toLowerCase().includes(query) ||
        item.material.toLowerCase().includes(query);

      return matchesCategory && matchesMaterial && matchesSearch;
    });
  }, [category, creations, material, search]);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginBottom: "2rem" }}>
        {categories.map((item) => (
          <button
            key={item}
            data-testid={`filter-cat-${item}`}
            onClick={() => setCategory(item)}
            className={category === item ? "btn-primary" : "btn-ghost"}
            style={{ padding: "0.72rem 1.1rem", cursor: "pointer" }}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "1.2rem", marginBottom: "4rem" }}>
        <div className="field">
          <label>Material</label>
          <select data-testid="filter-material" value={material} onChange={(event) => setMaterial(event.target.value)}>
            {materials.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Search</label>
          <input
            data-testid="filter-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by stone, collection, or form"
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
        {filtered.map((creation, index) => (
          <CreationCard key={creation.id} creation={creation} index={index} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ marginTop: "3rem", color: "var(--color-text-secondary)", textAlign: "center" }}>
          No creations match this selection yet.
        </p>
      )}
    </>
  );
}
