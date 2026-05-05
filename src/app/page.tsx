import Link from "next/link";
import CreationCard from "@/components/public/CreationCard";
import InquiryForm from "@/components/public/InquiryForm";
import Ornament from "@/components/public/Ornament";
import Reveal from "@/components/public/Reveal";
import { archiveSeries, creations } from "@/lib/public-data";

export default function Home() {
  return (
    <main data-testid="home-main" style={{ minHeight: "100vh", backgroundColor: "var(--color-background)", color: "var(--color-text)", overflow: "hidden" }}>
      <section className="section-pad-hero" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div
          aria-hidden="true"
          className="hero-img-container"
        >
          <div className="hero-img-gradient" />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 860, marginTop: "8vh" }}>
          <Reveal>
            <Ornament align="left" style={{ marginBottom: "1.5rem" }}>
              Est. 1988 · Makrana
            </Ornament>
            <h1 style={{ marginBottom: "1.8rem" }}>
              Where Stones
              <br />
              <span style={{ fontStyle: "italic", color: "var(--color-royal)" }}>Become Poetry</span>
            </h1>
            <p style={{ maxWidth: 520, marginBottom: "2.6rem", color: "var(--color-text-secondary)", fontSize: "1.2rem", lineHeight: 1.7 }}>
              For over three decades, Roop Stone Arts has coaxed verse from the quarries of Makrana, sculpting marble that carries the gravitas of Indian royalty and the quiet of modern sanctuaries.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link className="btn-primary" data-testid="hero-cta-creations" href="/creations">
                View Creations <span className="arrow">→</span>
              </Link>
              <Link className="btn-ghost" data-testid="hero-cta-consult" href="/book-consultation">
                Book a Consultation
              </Link>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2.8rem", marginTop: "2.6rem" }}>
              {[
                ["45+", "Master Artisans"],
                ["1200+", "Installations"],
                ["30+", "Countries"],
              ].map(([stat, label]) => (
                <div key={label}>
                  <p style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)", fontSize: "2rem", lineHeight: 1 }}>{stat}</p>
                  <p className="brand-subtitle" style={{ marginTop: "0.4rem" }}>{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={400}>
          <div style={{ position: "absolute", right: "5vw", bottom: "3rem", zIndex: 1, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", pointerEvents: "none" }}>
            <p className="brand-subtitle mobile-hide" style={{ writingMode: "vertical-rl", textOrientation: "mixed", opacity: 0.6 }}>
              Scroll to wander ↓
            </p>
          </div>
        </Reveal>
      </section>

      <section style={{ padding: "2rem 0", overflow: "hidden", borderTop: "1px solid rgba(119,89,44,0.12)", borderBottom: "1px solid rgba(119,89,44,0.12)", background: "var(--color-background-alt)" }}>
        <div className="marquee" style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)", fontSize: "1.4rem", letterSpacing: "0.1em" }}>
          {Array.from({ length: 2 }).flatMap((_, group) =>
            ["Makrana White", "✦", "Statuario", "✦", "Royal Jaali", "✦", "Sacred Geometry", "✦", "Hand-Carved", "✦", "Heirloom-Grade", "✦"].map((item, index) => (
              <span key={`${group}-${index}`}>{item}</span>
            )),
          )}
        </div>
      </section>

      <section className="section-pad">
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", marginBottom: "5rem" }}>
            <div>
              <Ornament align="left" style={{ marginBottom: "1rem" }}>
                The Archive
              </Ornament>
              <h2 style={{ maxWidth: 520 }}>Curated Series from our Master Archives</h2>
            </div>
            <p style={{ maxWidth: 340, color: "var(--color-text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, textAlign: "right" }}>
              Every slab carries a geology. Every vein, a memory. Discover the textures that have shaped eras of Indian architecture.
            </p>
          </div>
        </Reveal>
        <div className="hide-scrollbar" style={{ display: "flex", gap: "2.5rem", overflowX: "auto", paddingBottom: "2rem", scrollSnapType: "x mandatory" }}>
          {archiveSeries.map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <Link href="/creations" style={{ display: "block", minWidth: 340, scrollSnapAlign: "start" }}>
                <div className="tile-radius hover-lift" style={{ position: "relative", height: 460, overflow: "hidden", backgroundImage: `url('${item.image}')`, backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 20px 60px rgba(30,28,18,0.08)" }}>
                  <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", display: "flex", width: 42, height: 42, alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "rgba(251,247,238,0.85)", color: "var(--color-royal)", fontFamily: "var(--font-heading)", fontSize: "0.9rem", backdropFilter: "blur(10px)" }}>{item.roman}</div>
                  <div className="glass-panel" style={{ position: "absolute", right: "1.5rem", bottom: "1.5rem", left: "1.5rem", padding: "1.2rem 1.4rem", borderRadius: 14 }}>
                    <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "0.3rem" }}>{item.realm}</p>
                    <h3 style={{ fontSize: "1.35rem" }}>{item.title}</h3>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--color-background-alt)" }}>
        <div className="responsive-grid-2">
          <Reveal>
            <div className="tile-radius collection-img" />
          </Reveal>
          <Reveal delay={200}>
            <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "1rem" }}>The Collection</p>
            <h2 style={{ marginBottom: "2rem", fontStyle: "italic" }}>
              IRA.
              <br />
              Sculpted
              <br />
              Stillness.
            </h2>
            <p style={{ maxWidth: 440, marginBottom: "2.5rem", color: "var(--color-text-secondary)", fontSize: "1.1rem", lineHeight: 1.8 }}>
              Our IRA series redefines marble as a medium of modern art. Each piece is a singular dialogue between tectonic force and artisan touch, an heirloom posed as a quiet statement.
            </p>
            <Link className="btn-ghost" data-testid="home-ira-cta" href="/ira">Explore IRA Artworks →</Link>
          </Reveal>
        </div>
      </section>

      <section className="section-pad" style={{ position: "relative", textAlign: "center" }}>
        <Reveal>
          <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "1.2rem" }}>Sacred Heritage</p>
          <h2 style={{ maxWidth: 860, margin: "0 auto 1.8rem" }}>
            SPARSH. Crafting the <em style={{ color: "var(--color-primary)" }}>Sanctuary</em> within.
          </h2>
          <p style={{ maxWidth: 620, margin: "0 auto 4rem", color: "var(--color-text-secondary)", fontSize: "1.1rem", lineHeight: 1.8 }}>
            Custom-crafted marble mandirs and devotional spaces where geometric precision meets spiritual resonance, a legacy of piety, carved for eternity.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="sparsh-img">
            <div className="glass-panel sparsh-glass-panel">
              <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "0.6rem" }}>Featured Project</p>
              <h3 style={{ marginBottom: "0.8rem", fontSize: "1.6rem" }}>The Temple at Ajmer</h3>
              <p style={{ marginBottom: "1.6rem", color: "var(--color-text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>A masterpiece in Makrana Pure White marble, hand-carved jaalis and floral motifs.</p>
              <Link className="btn-ghost" style={{ fontSize: "0.72rem" }} href="/sparsh">View Sparsh Collection →</Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-pad" style={{ background: "var(--color-background-alt)" }}>
        <Reveal>
          <div style={{ marginBottom: "4rem", textAlign: "center" }}>
            <Ornament style={{ marginBottom: "1rem" }}>Featured Creations</Ornament>
            <h2>Handpicked from the Atelier</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
          {creations.slice(0, 8).map((creation, index) => (
            <Reveal key={creation.id} delay={index * 80}>
              <CreationCard creation={creation} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="responsive-grid-2">
          <Reveal>
            <p className="brand-subtitle" style={{ color: "var(--color-primary)", marginBottom: "1rem" }}>Process</p>
            <h2 style={{ marginBottom: "2rem" }}>
              Crafting
              <br />
              <em style={{ color: "var(--color-royal)" }}>Forever.</em>
            </h2>
            <p style={{ marginBottom: "3rem", color: "var(--color-text-secondary)", fontSize: "1.1rem", lineHeight: 1.8 }}>
              Our process is slow, deliberate, uncompromising. From quarry block to final polish, every touch is an act of preservation, a conversation between a Rajasthani artisan and the stone they have known since boyhood.
            </p>
            <Link className="btn-ghost" href="/how-it-works">Our Process →</Link>
          </Reveal>
          <Reveal delay={200}>
            <InquiryForm variant="consultation" source="consultation" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
