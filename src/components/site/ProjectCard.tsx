import { Link } from "@tanstack/react-router";
import type { PortfolioProject } from "@/data/cms";
import { projectSummary, projectTitle } from "@/data/cms";
import type { Lang } from "@/data/content";

export function ProjectCard({
  project,
  lang,
  index,
  eager,
}: {
  project: PortfolioProject;
  lang: Lang;
  index: number;
  eager?: boolean;
}) {
  const base = lang === "en" ? "/projects" : "/zh/projects";
  const cats = project.categories.map((c) => c.name).join(" · ");
  return (
    <Link
      to={`${base}/${project.slug}`}
      className="pcard reveal"
      aria-label={projectTitle(project, lang)}
    >
      <div className="pcard-media">
        {project.cover ? (
          <img
            src={project.cover}
            alt={projectTitle(project, lang)}
            loading={eager ? "eager" : "lazy"}
          />
        ) : (
          <div className="pcard-empty" aria-hidden="true" />
        )}
        <span className="pcard-num">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="pcard-body">
        <div className="pcard-cat">{cats || (lang === "en" ? "PROJECT" : "專案")}</div>
        <h3 className={lang === "en" ? "pcard-title" : "pcard-title pcard-title-cjk"}>
          {projectTitle(project, lang)}
        </h3>
        <p className="pcard-sum">{projectSummary(project, lang)}</p>
      </div>
      <style>{`
        .pcard { display: flex; flex-direction: column; text-decoration: none; color: inherit; }
        .pcard-media { position: relative; aspect-ratio: 4 / 3; overflow: hidden; background: var(--of-hairline); }
        .pcard-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 700ms ease; }
        .pcard:hover .pcard-media img { transform: scale(1.04); }
        .pcard-empty { width: 100%; height: 100%; background: var(--of-hairline); }
        .pcard-num { position: absolute; left: 0; top: 0; background: var(--of-yellow); color: var(--of-yellow-ink); font-size: 11px; font-weight: 700; letter-spacing: 0.18em; padding: 4px 8px; }
        .pcard-body { padding-top: 14px; border-top: 1px solid var(--of-hairline); margin-top: 14px; }
        .pcard-cat { font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--of-graphite); }
        .pcard-title { margin: 8px 0 0; font-family: var(--of-font-sans); font-size: clamp(1.05rem, 1.5vw, 1.35rem); font-weight: 700; letter-spacing: -0.02em; line-height: 1.25; }
        .pcard-title-cjk { font-family: var(--of-font-cjk); letter-spacing: -0.01em; }
        .pcard-sum { margin: 8px 0 0; font-size: 14px; line-height: 1.65; color: var(--of-graphite); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </Link>
  );
}