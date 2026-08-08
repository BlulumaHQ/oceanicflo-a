import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { portfolioQueryOptions, projectTitle, type PortfolioProject } from "@/data/cms";
import type { Lang } from "@/data/content";

/**
 * Homepage Selected Work — one representative live CMS project per category
 * (5 service categories + 1 award category), in a tidy uniform grid.
 */
export function CmsSelectedWork({ lang }: { lang: Lang }) {
  const { data } = useSuspenseQuery(portfolioQueryOptions);
  const { projects, categories } = data;
  const base = lang === "en" ? "/projects" : "/zh/projects";

  const used = new Set<string>();
  const picks: Array<{ label: string; slug: string; project: PortfolioProject }> = [];
  for (const c of categories) {
    const inCat = projects.filter((p) => p.categories.some((pc) => pc.id === c.id));
    const pick = inCat.find((p) => !used.has(p.id) && p.cover) ?? inCat.find((p) => p.cover);
    if (!pick) continue;
    used.add(pick.id);
    picks.push({ label: c.name, slug: c.slug, project: pick });
  }

  return (
    <>
      <div className="sw-grid">
        {picks.map((p, i) => (
          <Link key={p.slug} to={`${base}/${p.project.slug}`} className={`sw-cell sw-${i + 1}`}>
            <div className="sw-media">
              <img src={p.project.cover!} alt={projectTitle(p.project, lang)} loading={i < 2 ? "eager" : "lazy"} />
            </div>
            <div className="sw-meta">
              <span className="sw-cat"><span className="sw-dot" aria-hidden="true" />{p.label}</span>
              <span className="sw-title">{projectTitle(p.project, lang)}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="sw-links">
        {categories.map((c) => (
          <Link key={c.id} to={base} search={{ category: c.slug }} className="sw-chip">{c.name}</Link>
        ))}
      </div>
      <style>{`
        .sw-grid { display: grid; grid-template-columns: repeat(12, 1fr); grid-auto-rows: clamp(148px, 18.7vw, 237px); gap: clamp(12px, 1.9vw, 24px); }
        .sw-cell { display: flex; flex-direction: column; gap: 12px; text-decoration: none; color: inherit; }
        .sw-media { overflow: hidden; background: var(--of-hairline); flex: 1; min-height: 0; }
        .sw-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 700ms ease; }
        .sw-cell:hover .sw-media img { transform: scale(1.03); }
        .sw-meta { display: flex; flex-direction: column; gap: 4px; }
        .sw-cat { font-size: 11px; letter-spacing: 0.2em; font-weight: 700; color: var(--of-graphite); display: inline-flex; align-items: center; gap: 8px; text-transform: uppercase; }
        .sw-dot { width: 6px; height: 6px; background: var(--of-yellow); display: inline-block; }
        .sw-title { font-family: var(--of-font-sans); font-size: 15px; font-weight: 700; letter-spacing: -0.01em; }
        .sw-1 { grid-column: span 8; } .sw-2 { grid-column: span 4; }
        .sw-3, .sw-4, .sw-5 { grid-column: span 4; }
        .sw-6 { grid-column: span 12; }
        .sw-links { margin-top: 40px; display: flex; flex-wrap: wrap; gap: 10px; }
        .sw-chip { padding: 8px 14px; border: 1px solid var(--of-hairline); font-size: 12px; font-weight: 600; letter-spacing: 0.04em; color: var(--of-graphite); text-decoration: none; }
        .sw-chip:hover { border-color: var(--of-ink); color: var(--of-ink); }
        @media (max-width: 960px) {
          .sw-grid { grid-template-columns: repeat(6, 1fr); grid-auto-rows: clamp(180px, 30vw, 260px); }
          .sw-1, .sw-2, .sw-6 { grid-column: span 6; }
          .sw-3, .sw-4, .sw-5 { grid-column: span 2; }
        }
        @media (max-width: 560px) {
          .sw-grid { grid-template-columns: 1fr; grid-auto-rows: clamp(200px, 55vw, 280px); }
          .sw-1, .sw-2, .sw-3, .sw-4, .sw-5, .sw-6 { grid-column: span 1; }
        }
      `}</style>
    </>
  );
}