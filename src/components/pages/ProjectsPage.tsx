import { SiteLayout } from "@/components/site/Layout";
import { FinalCTA } from "@/components/site/CTA";
import { SelectedWorkGallery } from "@/components/site/Gallery";
import { PROJECT_TYPES, type Lang } from "@/data/content";

export function ProjectsPage({ lang }: { lang: Lang }) {
  const t = lang === "en"
    ? { eyebrow: "SELECTED WORK · OCEANICFLO", title: "Selected work.", lead: "A curated view of Oceanicflo's recent construction work — presented across the categories used to describe the project portfolio.", typesEyebrow: "PROJECT CATEGORIES", ctaEyebrow: "DISCUSS · YOUR PROJECT", ctaHeading: "Considering something similar?", ctaBody: "Provide the current details — type of work, scope, and timing — and Oceanicflo can follow up on suitability and next steps.", captions: ["SPECIALIZED INDUSTRIAL · 2023", "COMMERCIAL · 2022", "RESIDENTIAL · 2023", "INSTITUTIONAL · 2022", "INDUSTRIAL · 2023", "SELECTED OTHER · 2022"] }
    : { eyebrow: "精選專案 · OCEANICFLO", title: "精選專案。", lead: "以下為 Oceanicflo 近期施工作品的精選整理，依照公司使用的專案類別分類呈現。", typesEyebrow: "專案類別", ctaEyebrow: "洽談 · 您的專案", ctaHeading: "考慮類似的專案？", ctaBody: "請提供目前的資料——工作類型、範圍及預計時程——Oceanicflo 將就適用性及下一步與您聯絡。", captions: ["專業工業設施 · 2023", "商業空間 · 2022", "住宅 · 2023", "機構設施 · 2022", "工業設施 · 2023", "其他精選 · 2022"] };
  const types = PROJECT_TYPES[lang];
  return (
    <SiteLayout lang={lang}>
      <section>
        <div className="container-editorial" style={{ paddingBlock: "clamp(59px, 9.4vw, 104px) clamp(36px, 4.7vw, 59px)" }}>
          <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginBottom: 24 }}>{t.eyebrow}</div>
          <h1 className={lang === "en" ? "display-en" : "display-cjk"} style={{ margin: 0 }}>{t.title}</h1>
          <p style={{ marginTop: 28, maxWidth: 720, fontSize: 18, color: "var(--of-graphite)", lineHeight: 1.75 }}>{t.lead}</p>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {types.map((tp, i) => (
              <span key={tp} style={{ padding: "8px 14px", border: "1px solid var(--of-hairline)", fontSize: 12, letterSpacing: lang === "en" ? "0.12em" : "0.04em", color: "var(--of-graphite)", fontWeight: 600, textTransform: lang === "en" ? "uppercase" : "none" }}>
                <span style={{ color: "var(--of-yellow-ink)", background: "var(--of-yellow)", padding: "1px 6px", marginRight: 8, letterSpacing: "0.14em" }}>0{i + 1}</span>{tp}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: "var(--of-paper)" }}>
        <div className="container-editorial" style={{ paddingBlock: "clamp(44px, 7.8vw, 89px)" }}>
          <SelectedWorkGallery captions={t.captions} lang={lang} />
        </div>
      </section>
      <FinalCTA lang={lang} eyebrow={t.ctaEyebrow} heading={t.ctaHeading} body={t.ctaBody} />
    </SiteLayout>
  );
}