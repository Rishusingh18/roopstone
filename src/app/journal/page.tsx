import Ornament from "@/components/public/Ornament";
import Reveal from "@/components/public/Reveal";
import { journalPosts } from "@/lib/public-data";

export const metadata = { title: "Journal — Roop Stone Arts" };

export default function JournalPage() {
  return (
    <main data-testid="journal-main" style={{ minHeight: "100vh", background: "var(--color-background)", paddingTop: "9rem" }}>
      <section className="section-pad">
        <Reveal>
          <Ornament style={{ marginBottom: "1.2rem" }}>Journal</Ornament>
          <h1 style={{ margin: "0 auto 4rem", maxWidth: 860, textAlign: "center" }}>Notes from the atelier.</h1>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {journalPosts.map((post, index) => (
            <Reveal key={post.title} delay={index * 120}>
              <article className="glass-panel hover-lift" style={{ overflow: "hidden", borderRadius: 18 }}>
                <div style={{ height: 320, backgroundImage: `url('${post.image}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ padding: "2rem" }}>
                  <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "0.8rem" }}>{post.date}</p>
                  <h3 style={{ marginBottom: "1rem" }}>{post.title}</h3>
                  <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{post.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
