"use client";

import { useMemo, useState } from "react";

interface Option {
  label: string;
  value: string;
  note: string;
}

const templeTypes: Option[] = [
  { label: "Residential Mandir", value: "floor_standing", note: "A home shrine with carved plinth and pillars." },
  { label: "Pooja Room", value: "pooja_room_complete", note: "A complete room treatment with wall and altar work." },
  { label: "Grand Sanctum", value: "pooja_room_complete", note: "A large-scale sacred space with deeper carving." },
  { label: "Outdoor Temple", value: "floor_standing", note: "A weather-aware temple form for courts or gardens." },
  { label: "Altar / Modern", value: "wall_mounted", note: "A minimal wall-mounted altar for compact homes." },
];

const materials: Option[] = [
  { label: "Premium Makrana", value: "premium_makrana", note: "Luminous, devotional, and heritage-grade." },
  { label: "Vietnam White", value: "standard_vietnam", note: "Quiet white marble with restrained cost." },
  { label: "Italian Carrara", value: "italian_carrara", note: "Soft grey veining for refined interiors." },
];

const complexities: Option[] = [
  { label: "Minimal", value: "minimal", note: "Clean geometry and light detailing." },
  { label: "Moderate", value: "moderate", note: "Balanced borders, niches, and ornament." },
  { label: "Intricate Heritage", value: "intricate_heritage", note: "Dense jaali, floral, and column carving." },
];

export default function Estimator() {
  const [step, setStep] = useState(0);
  const [templeType, setTempleType] = useState(templeTypes[0].value);
  const [material, setMaterial] = useState(materials[0].value);
  const [complexity, setComplexity] = useState(complexities[1].value);
  const [widthFt, setWidthFt] = useState(5);
  const [heightFt, setHeightFt] = useState(7);
  const [backlit, setBacklit] = useState(false);
  const [internationalShipping, setInternationalShipping] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const progress = useMemo(() => `${Math.round(((step + 1) / 4) * 100)}%`, [step]);

  async function calculate() {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const response = await fetch("/api/estimator/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templeType, material, complexity, widthFt, heightFt, backlit, internationalShipping }),
      });
      const payload = await response.json();
      if (!response.ok || !payload?.data) throw new Error("No result");
      const { priceMin, priceMax } = payload.data;
      setResult(`Indicative range: ₹${Number(priceMin).toLocaleString("en-IN")} - ₹${Number(priceMax).toLocaleString("en-IN")}`);
    } catch {
      const sqft = widthFt * heightFt;
      const base = sqft * 14500 * (complexity === "intricate_heritage" ? 1.65 : complexity === "moderate" ? 1.25 : 1);
      const low = Math.round(base * 0.9);
      const high = Math.round(base * 1.2);
      setResult(`Indicative range: ₹${low.toLocaleString("en-IN")} - ₹${high.toLocaleString("en-IN")}`);
      setError("Live pricing config is unavailable, so this is a guided atelier estimate.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-testid="estimator-main" style={{ maxWidth: 980, margin: "0 auto" }}>
      <div data-testid="estimator-progress" style={{ height: 6, borderRadius: 999, background: "rgba(119,89,44,0.14)", marginBottom: "3rem" }}>
        <div style={{ width: progress, height: "100%", borderRadius: 999, background: "var(--color-primary)", transition: "width .5s var(--ease-silk)" }} />
      </div>

      <div className="glass-panel motif-corner" style={{ position: "relative", padding: "3rem", borderRadius: 24 }}>
        {step === 0 && (
          <div data-testid="estimator-step-0">
            <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "1rem" }}>Step One</p>
            <h2 style={{ marginBottom: "2rem" }}>What kind of sacred space are you imagining?</h2>
            <OptionGrid options={templeTypes} selected={templeType} onSelect={setTempleType} prefix="estimator-option" />
          </div>
        )}
        {step === 1 && (
          <div data-testid="estimator-step-1">
            <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "1rem" }}>Step Two</p>
            <h2 style={{ marginBottom: "2rem" }}>Choose the marble voice.</h2>
            <OptionGrid options={materials} selected={material} onSelect={setMaterial} prefix="estimator-material" />
          </div>
        )}
        {step === 2 && (
          <div data-testid="estimator-step-2">
            <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "1rem" }}>Step Three</p>
            <h2 style={{ marginBottom: "2rem" }}>Set scale and carving depth.</h2>
            <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
              <div className="field">
                <label>Width (ft)</label>
                <input type="number" min={1} value={widthFt} onChange={(event) => setWidthFt(Number(event.target.value))} />
              </div>
              <div className="field">
                <label>Height (ft)</label>
                <input type="number" min={1} value={heightFt} onChange={(event) => setHeightFt(Number(event.target.value))} />
              </div>
            </div>
            <OptionGrid options={complexities} selected={complexity} onSelect={setComplexity} prefix="estimator-complexity" />
          </div>
        )}
        {step === 3 && (
          <div data-testid="estimator-step-3">
            <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "1rem" }}>Step Four</p>
            <h2 style={{ marginBottom: "2rem" }}>Finish the conversation.</h2>
            <label style={{ display: "flex", gap: "0.8rem", marginBottom: "1rem", color: "var(--color-text-secondary)" }}>
              <input type="checkbox" checked={backlit} onChange={(event) => setBacklit(event.target.checked)} />
              Include warm backlighting
            </label>
            <label style={{ display: "flex", gap: "0.8rem", marginBottom: "2rem", color: "var(--color-text-secondary)" }}>
              <input type="checkbox" checked={internationalShipping} onChange={(event) => setInternationalShipping(event.target.checked)} />
              International shipping and crating
            </label>
            <button className="btn-primary" onClick={calculate} disabled={loading}>
              {loading ? "Calculating..." : "Calculate Estimate"}
              <span className="arrow">→</span>
            </button>
            {result && <h3 style={{ marginTop: "2rem", color: "var(--color-primary)" }}>{result}</h3>}
            {error && <p style={{ marginTop: "1rem", color: "var(--color-text-secondary)" }}>{error}</p>}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginTop: "3rem" }}>
          <button className="btn-ghost" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
            Back
          </button>
          {step < 3 && (
            <button className="btn-primary" onClick={() => setStep((value) => Math.min(3, value + 1))}>
              Continue
              <span className="arrow">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function OptionGrid({
  options,
  selected,
  onSelect,
  prefix,
}: {
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
  prefix: string;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "1rem" }}>
      {options.map((option) => (
        <button
          key={option.value}
          data-testid={`${prefix}-${option.label.replaceAll(" ", "-")}`}
          onClick={() => onSelect(option.value)}
          style={{
            textAlign: "left",
            padding: "1.3rem",
            borderRadius: 16,
            border: selected === option.value ? "1px solid var(--color-primary)" : "1px solid rgba(119,89,44,0.14)",
            background: selected === option.value ? "rgba(119,89,44,0.1)" : "rgba(255,255,255,0.45)",
            color: "var(--color-text)",
            cursor: "pointer",
            transition: "all .3s ease",
          }}
        >
          <strong style={{ display: "block", marginBottom: "0.6rem" }}>{option.label}</strong>
          <span style={{ color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{option.note}</span>
        </button>
      ))}
    </div>
  );
}
