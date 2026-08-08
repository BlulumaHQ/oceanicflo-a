import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/Layout";
import { FinalCTA } from "@/components/site/CTA";
import { ProjectGallery } from "@/components/site/ProjectGallery";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/components/site/Icons";
import { portfolioQueryOptions, projectTitle, unifiedTags, type PortfolioProject } from "@/data/cms";
import type { Lang } from "@/data/content";

function factRows(p: PortfolioProject, lang: Lang) {
  const d = p.details;
  if (!d) return [] as Array<{ label: string; value: string }>;
  const L = (en: string, zh: string) => (lang === "en" ? en : zh);
  const place = d.location || [d.city, d.province, d.country].filter(Boolean).join(", ");
  const year = d.year_completed || d.project_year;
  const area = d.floor_area_value ? `${d.floor_area_value.toLocaleString()} ${d.floor_area_unit || "sq. ft."}` : "";
  const site = d.site_area_value ? `${d.site_area_value.toLocaleString()} ${d.site_area_unit || "sq. ft."}` : "";
  const rows: Array<{ label: string; value: string }> = [
    { label: L("Client", "業主"), value: d.client_name || "" },
    { label: L("Location", "地點"), value: place },
    { label: L("Year", "年份"), value: year ? String(year) : "" },
    { label: L("Status", "狀態"), value: d.project_status || "" },
    { label: L("Role", "角色"), value: d.role || "" },
    { label: L("Services", "服務"), value: (d.services ?? []).join(", ") },
    { label: L("Floor Area", "建築面積"), value: area },
    { label: L("Site Area", "基地面積"), value: site },
    { label: L("Units", "單位數"), value: d.units_count ? String(d.units_count) : "" },
    { label: L("Storeys", "樓層數"), value: d.storeys_count ? String(d.storeys_count) : "" },
    { label: L("General Contractor", "總承包"), value: d.general_contractor || "" },
    { label: L("Owner / Developer", "業主 / 開發商"), value: d.developer_owner_client || "" },
    { label: L("Architect", "建築師"), value: d.design_architect || d.architect_of_record || "" },
    { label: L("Interior Design", "室內設計"), value: d.interior_designer || "" },
    { label: L("Structural", "結構工程"), value: d.structural_engineer || "" },
    { label: L("Awards", "獲獎"), value: d.awards || "" },
  ];
  return rows.filter((r) => r.value.trim() !== "");
}

export function ProjectDetailPage({ lang, slug }: { lang: Lang; slug: string }) {
  const { data } = useSuspenseQuery(portfolioQueryOptions);
  const { projects } = data;
  const idx = projects.findIndex((p) => p.slug === slug);
  const base = lang === "en" ? "/projects" : "/zh/projects";
  const detailTo = lang === "en" ? "/projects/$slug" : "/zh/projects/$slug";

  if (idx === -1) {
    return (
      <SiteLayout lang={lang}>
        <div className="container-editorial" style={{ paddingBlock: "clamp(80px, 12vw, 160px)" }}>
          <h1 className={lang === "en" ? "display-en" : "display-cjk"} style={{ margin: 0 }}>
            {lang === "en" ? "Project not found." : "找不到專案。"}
          </h1>
          <Link to={base} search={{}} className="btn btn-secondary" style={{ marginTop: 28 }}>
            {lang === "en" ? "Back to all projects" : "返回所有專案"} <ArrowRight />
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const p = projects[idx];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const facts = factRows(p, lang);
  const tags = unifiedTags(p);
  const overview =
    (lang === "zh" ? p.bodyZh || p.details?.scope_of_work_zh : null) ||
    p.details?.short_summary ||
    p.body ||
    p.excerpt ||
    "";
  const scope = lang === "zh" ? p.details?.scope_of_work_zh || p.details?.scope_of_work : p.details?.scope_of_work;
  const features = lang === "zh" ? p.details?.key_features_zh || p.details?.key_features : p.details?.key_features;

  return (
    <SiteLayout lang={lang}>
      <section>
        <div className="container-editorial" style={{ paddingBlock: "clamp(40px, 5.6vw, 68px) clamp(20px, 2.6vw, 32px)" }}>
          <Link to={base} search={{}} className="pd-back">
            <ChevronLeft /> {lang === "en" ? "ALL PROJECTS" : "所有專案"}
          </Link>
          <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginTop: 22 }}>
            {p.categories.map((c) => c.name).join(" · ") || (lang === "en" ? "PROJECT" : "專案")}
          </div>
          <h1 className={lang === "en" ? "display-en" : "display-cjk"} style={{ margin: "16px 0 0" }}>
            {projectTitle(p, lang)}
          </h1>
        </div>
      </section>

      <section>
        <div className="container-editorial" style={{ paddingBottom: "clamp(40px, 5.6vw, 68px)" }}>
          <div className="pd-layout">
            <div>
              <ProjectGallery images={p.images} lang={lang} title={projectTitle(p, lang)} />

              <div className="pd-overview">
                <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginBottom: 16 }}>
                  {lang === "en" ? "PROJECT OVERVIEW" : "專案概述"}
                </div>
                {overview && <p className="pd-body">{overview}</p>}
                {scope && (
                  <>
                    <h2 className="pd-sub">{lang === "en" ? "Scope of Work" : "工作範圍"}</h2>
                    <p className="pd-body">{scope}</p>
                  </>
                )}
                {features && (
                  <>
                    <h2 className="pd-sub">{lang === "en" ? "Key Features" : "專案重點"}</h2>
                    <p className="pd-body">{features}</p>
                  </>
                )}
              </div>

              {tags.length > 0 && (
                <div className="pd-tags">
                  <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginBottom: 14 }}>
                    {lang === "en" ? "TAGS" : "標籤"}
                  </div>
                  <div className="pd-taglist">
                    {tags.map((tg) => (
                      <span key={tg} className="pd-tag">{tg}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="pd-side">
              <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginBottom: 18 }}>
                {lang === "en" ? "PROJECT DATA" : "專案資料"}
              </div>
              <dl className="pd-facts">
                {facts.map((f) => (
                  <div key={f.label} className="pd-fact">
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Link to={lang === "en" ? "/contact" : "/zh/contact"} className="btn btn-primary" style={{ marginTop: 26 }}>
                {lang === "en" ? "Discuss a similar project" : "洽談類似專案"} <ArrowRight />
              </Link>
            </aside>
          </div>

          <nav className="pd-nav" aria-label={lang === "en" ? "Project navigation" : "專案導覽"}>
            <Link to={detailTo} params={{ slug: prev.slug }} className="pd-nav-link">
              <span className="pd-nav-lab"><ChevronLeft /> {lang === "en" ? "PREVIOUS" : "上一個"}</span>
              <span className="pd-nav-title">{projectTitle(prev, lang)}</span>
            </Link>
            <Link to={detailTo} params={{ slug: next.slug }} className="pd-nav-link pd-nav-right">
              <span className="pd-nav-lab">{lang === "en" ? "NEXT" : "下一個"} <ChevronRight /></span>
              <span className="pd-nav-title">{projectTitle(next, lang)}</span>
            </Link>
          </nav>
        </div>
      </section>

      <FinalCTA
        lang={lang}
        eyebrow={lang === "en" ? "NEXT STEP" : "下一步"}
        heading={lang === "en" ? "Have a project in mind?" : "有專案想討論？"}
        body={lang === "en"
          ? "Send Oceanicflo the details currently available. The team can follow up regarding requirements, scope, and next steps."
          : "請將目前可提供的資料寄給 Oceanicflo，我們將就需求、範圍及下一步與您聯絡。"}
      />

      <style>{`
        .pd-back { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; color: var(--of-graphite); text-decoration: none; }
        .pd-back:hover { color: var(--of-ink); }
        .pd-layout { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: clamp(28px, 3.6vw, 56px); align-items: start; }
        .pd-side { border-top: 2px solid var(--of-ink); padding-top: 18px; position: sticky; top: 104px; }
        .pd-facts { margin: 0; }
        .pd-fact { display: grid; grid-template-columns: 1fr; gap: 2px; padding: 11px 0; border-bottom: 1px solid var(--of-hairline); }
        .pd-fact dt { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--of-graphite); }
        .pd-fact dd { margin: 0; font-size: 15px; line-height: 1.55; color: var(--of-ink); font-weight: 500; }
        .pd-overview { margin-top: clamp(28px, 3.4vw, 44px); }
        .pd-body { font-size: 17px; line-height: 1.8; color: var(--of-graphite); max-width: 720px; margin: 0 0 18px; white-space: pre-line; }
        .pd-sub { font-family: var(--of-font-sans); font-size: clamp(1.1rem, 1.6vw, 1.4rem); font-weight: 700; letter-spacing: -0.02em; margin: 26px 0 10px; }
        .pd-tags { margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--of-hairline); }
        .pd-taglist { display: flex; flex-wrap: wrap; gap: 8px; }
        .pd-tag { border: 1px solid var(--of-hairline); padding: 7px 12px; font-size: 12px; font-weight: 600; letter-spacing: 0.04em; color: var(--of-graphite); }
        .pd-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: clamp(40px, 5.6vw, 72px); border-top: 1px solid var(--of-hairline); padding-top: 22px; }
        .pd-nav-link { text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 6px; }
        .pd-nav-right { text-align: right; align-items: flex-end; }
        .pd-nav-lab { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; color: var(--of-graphite); }
        .pd-nav-title { font-family: var(--of-font-sans); font-size: clamp(1rem, 1.4vw, 1.25rem); font-weight: 700; letter-spacing: -0.02em; }
        .pd-nav-link:hover .pd-nav-title { color: var(--of-yellow-ink); background: var(--of-yellow); }
        @media (max-width: 900px) {
          .pd-layout { grid-template-columns: 1fr; }
          .pd-side { position: static; }
        }
      `}</style>
    </SiteLayout>
  );
}