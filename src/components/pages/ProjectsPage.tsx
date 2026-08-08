import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { FinalCTA } from "@/components/site/CTA";
import { ProjectCard } from "@/components/site/ProjectCard";
import { portfolioQueryOptions } from "@/data/cms";
import type { Lang } from "@/data/content";

export function ProjectsPage({
  lang,
  category,
  onCategoryChange,
}: {
  lang: Lang;
  category?: string;
  onCategoryChange: (slug: string | undefined) => void;
}) {
  const { data } = useSuspenseQuery(portfolioQueryOptions);
  const { projects, categories } = data;

  const t = lang === "en"
    ? { eyebrow: "SELECTED WORK · OCEANICFLO", title: "Selected work.", lead: "Oceanicflo's project portfolio — individual projects across specialized industrial, single family, interior + retail, religious + recreation, and construction consultation work.", all: "All Projects", count: "PROJECTS", ctaEyebrow: "DISCUSS · YOUR PROJECT", ctaHeading: "Considering something similar?", ctaBody: "Provide the current details — type of work, scope, and timing — and Oceanicflo can follow up on suitability and next steps." }
    : { eyebrow: "精選專案 · OCEANICFLO", title: "精選專案。", lead: "Oceanicflo 的專案作品集——涵蓋專業工業設施、獨立住宅、室內與商業空間、宗教與休閒設施，以及施工顧問等各類專案。", all: "全部專案", count: "個專案", ctaEyebrow: "洽談 · 您的專案", ctaHeading: "考慮類似的專案？", ctaBody: "請提供目前的資料——工作類型、範圍及預計時程——Oceanicflo 將就適用性及下一步與您聯絡。" };

  const filtered = category
    ? projects.filter((p) => p.categories.some((c) => c.slug === category))
    : projects;

  return (
    <SiteLayout lang={lang}>
      <section>
        <div className="container-editorial" style={{ paddingBlock: "clamp(59px, 9.4vw, 104px) clamp(28px, 3.4vw, 42px)" }}>
          <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginBottom: 24 }}>{t.eyebrow}</div>
          <h1 className={lang === "en" ? "display-en" : "display-cjk"} style={{ margin: 0 }}>{t.title}</h1>
          <p style={{ marginTop: 24, maxWidth: 760, fontSize: 18, color: "var(--of-graphite)", lineHeight: 1.75 }}>{t.lead}</p>

          <div className="pfilters" role="group" aria-label={lang === "en" ? "Filter projects by category" : "依類別篩選專案"}>
            <button type="button" className={`pfilter${!category ? " is-active" : ""}`} onClick={() => onCategoryChange(undefined)}>
              {t.all}<span className="pfilter-n">{projects.length}</span>
            </button>
            {categories.map((c) => {
              const n = projects.filter((p) => p.categories.some((pc) => pc.slug === c.slug)).length;
              return (
                <button key={c.id} type="button" className={`pfilter${category === c.slug ? " is-active" : ""}`} onClick={() => onCategoryChange(c.slug)}>
                  {c.name}<span className="pfilter-n">{n}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--of-paper)" }}>
        <div className="container-editorial" style={{ paddingBlock: "clamp(36px, 5.6vw, 66px)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "var(--of-graphite)", marginBottom: 24 }}>
            {lang === "en" ? `${filtered.length} ${t.count}` : `${filtered.length} ${t.count}`}
          </div>
          <div className="pgrid">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} lang={lang} index={i} eager={i < 3} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA lang={lang} eyebrow={t.ctaEyebrow} heading={t.ctaHeading} body={t.ctaBody} />
      <style>{`
        .pfilters { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
        .pfilter { background: transparent; border: 1px solid var(--of-hairline); padding: 9px 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; color: var(--of-graphite); cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 200ms; }
        .pfilter:hover { border-color: var(--of-ink); color: var(--of-ink); }
        .pfilter.is-active { background: var(--of-ink); border-color: var(--of-ink); color: var(--of-bg); }
        .pfilter-n { font-size: 10px; letter-spacing: 0.1em; background: var(--of-yellow); color: var(--of-yellow-ink); padding: 1px 6px; }
        .pgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(20px, 2.6vw, 36px) clamp(16px, 2vw, 28px); }
        @media (max-width: 900px) { .pgrid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .pgrid { grid-template-columns: 1fr; } }
      `}</style>
    </SiteLayout>
  );
}