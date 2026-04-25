import Ornament from "@/components/public/Ornament";
import Reveal from "@/components/public/Reveal";
import { legacyProjects } from "@/lib/public-data";

export const metadata = { title: "Legacy Works — Roop Stone Arts" };

export default function LegacyWorksPage() {
  return (
    <main data-testid="legacy-main" style={{ minHeight: "100vh", background: "var(--color-background)", paddingTop: "9rem" }}>
      <section className="section-pad">
        <Reveal>
          <Ornament style={{ marginBottom: "1.2rem" }}>Portfolio</Ornament>
          <h1 style={{ textAlign: "center", maxWidth: 900, margin: "0 auto 4rem" }}>A portfolio across continents.</h1>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {legacyProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 100}>
              <article className="hover-lift">
                <div className="tile-radius" style={{ height: 420, backgroundImage: `url('${project.image}')`, backgroundSize: "cover", backgroundPosition: "center", marginBottom: "1.2rem" }} />
                <p className="brand-subtitle" style={{ color: "var(--color-royal)", marginBottom: "0.4rem" }}>{project.place} · {project.year}</p>
                <h3>{project.title}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
