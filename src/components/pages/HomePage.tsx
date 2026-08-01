import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Datum } from "@/components/site/Datum";
import { FinalCTA } from "@/components/site/CTA";
import { MetricsBlock } from "@/components/site/Metrics";
import { SelectedWorkGallery } from "@/components/site/Gallery";
import { HeroSlider } from "@/components/site/HeroSlider";
import { IMAGES, SERVICES, PROJECT_TYPES, CTA, type Lang } from "@/data/content";

export function HomePage({ lang }: { lang: Lang }) {
  const t = lang === "en" ? EN : ZH;
  const cta = CTA[lang];
  const services = SERVICES[lang];
  const types = PROJECT_TYPES[lang];
  const galleryCaptions = t.galleryCaptions;
  return (
    <SiteLayout lang={lang}>
      {/* Hero — full background image slider */}
      <HeroSlider
        lang={lang}
        slides={t.heroSlides}
        ctaPrimary={cta.discuss}
        ctaSecondary={cta.viewWork}
      />

      <section>
        <div className="container-editorial" style={{ paddingBlock: "clamp(40px, 6vw, 64px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, borderTop: "1px solid var(--of-hairline)", paddingTop: 32 }} className="hero-datums">
            {t.heroDatums.map((d, i) => (
              <div key={i} style={{ fontSize: 12, color: "var(--of-graphite)", lineHeight: 1.6 }}>
                <span style={{ color: "var(--of-yellow-ink)", background: "var(--of-yellow)", padding: "1px 6px", fontWeight: 700, fontSize: 10, letterSpacing: "0.18em", marginRight: 8 }}>0{i + 1}</span>
                {d}
              </div>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 900px){ .hero-datums { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </section>

      {/* Introduction */}
      <section style={{ background: "var(--of-paper)" }}>
        <div className="container-editorial" style={{ paddingBlock: "clamp(80px, 12vw, 140px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "0.6fr 1fr", gap: "clamp(28px, 6vw, 96px)" }} className="two-col">
            <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"}>{t.introEyebrow}</div>
            <Datum>
              <h2 style={{ fontFamily: lang === "en" ? "var(--of-font-sans)" : "var(--of-font-cjk)", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", lineHeight: 1.25, letterSpacing: lang === "en" ? "-0.02em" : "-0.01em", fontWeight: 600, margin: 0, maxWidth: 820 }}>
                {t.introBody}
              </h2>
              <p style={{ marginTop: 32, color: "var(--of-graphite)", fontSize: 17, lineHeight: 1.8, maxWidth: 720 }}>{t.introSecondary}</p>
            </Datum>
          </div>
          <style>{`@media (max-width: 900px){ .two-col { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      <MetricsBlock lang={lang} label={t.metricsEyebrow} />

      {/* Services preview */}
      <section>
        <div className="container-editorial" style={{ paddingBlock: "clamp(80px, 12vw, 140px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 56 }}>
            <div>
              <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginBottom: 20 }}>{t.servicesEyebrow}</div>
              <h2 className={lang === "en" ? "display-en" : "display-cjk"} style={{ margin: 0, maxWidth: 900 }}>
                {t.servicesHeading}
              </h2>
            </div>
            <Link to={lang === "en" ? "/services" : "/zh/services"} className="btn btn-secondary">{cta.exploreServices} <ArrowRight /></Link>
          </div>
          <div style={{ borderTop: "1px solid var(--of-hairline)" }}>
            {services.map((s) => (
              <div key={s.num} className="reveal" style={{ display: "grid", gridTemplateColumns: "80px 1fr 2fr", gap: 32, padding: "32px 0", borderBottom: "1px solid var(--of-hairline)", alignItems: "start" }}>
                <div style={{ fontFamily: "var(--of-font-sans)", fontSize: 32, fontWeight: 700, color: "var(--of-graphite)", letterSpacing: "-0.02em" }}>{s.num}</div>
                <h3 style={{ margin: 0, fontFamily: lang === "en" ? "var(--of-font-sans)" : "var(--of-font-cjk)", fontSize: "clamp(1.25rem,2vw,1.75rem)", fontWeight: 700, letterSpacing: lang === "en" ? "-0.02em" : "-0.01em", lineHeight: 1.2 }}>{s.title}</h3>
                <p style={{ margin: 0, color: "var(--of-graphite)", fontSize: 16, lineHeight: 1.7 }}>{s.short}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section style={{ background: "var(--of-paper)" }}>
        <div className="container-editorial" style={{ paddingBlock: "clamp(80px, 12vw, 140px)" }}>
          <div style={{ marginBottom: 56 }}>
            <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginBottom: 20 }}>{t.workEyebrow}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-end", justifyContent: "space-between" }}>
              <h2 className={lang === "en" ? "display-en" : "display-cjk"} style={{ margin: 0, maxWidth: 900 }}>{t.workHeading}</h2>
              <Link to={lang === "en" ? "/projects" : "/zh/projects"} className="btn btn-secondary">{cta.viewAll} <ArrowRight /></Link>
            </div>
          </div>
          <SelectedWorkGallery captions={galleryCaptions} lang={lang} />
          <div style={{ marginTop: 56, display: "flex", flexWrap: "wrap", gap: 12 }}>
            {types.map((tp) => (
              <span key={tp} style={{ padding: "8px 14px", border: "1px solid var(--of-hairline)", fontSize: 12, letterSpacing: lang === "en" ? "0.12em" : "0.04em", color: "var(--of-graphite)", fontWeight: 600, textTransform: lang === "en" ? "uppercase" : "none" }}>{tp}</span>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA lang={lang} eyebrow={t.ctaEyebrow} heading={t.ctaHeading} body={t.ctaBody} />
    </SiteLayout>
  );
}

const EN = {
  heroEyebrow: "OCEANICFLO · RICHMOND, BRITISH COLUMBIA · EST. 2009",
  heroTitleA: "Building",
  heroTitleEm: "structured",
  heroTitleB: "construction outcomes.",
  heroLead:
    "A Richmond-based construction company delivering integrated project delivery, design + build, general contracting, construction management, and project management across specialized industrial, commercial, residential, industrial, and institutional work.",
  heroAlt: "Concrete construction detail from an Oceanicflo project.",
  heroDatums: [
    "Coordinated project delivery across design, fabrication, and construction phases.",
    "Owners, consultants, contractors, and operators inside one working structure.",
    "Delivered across specialized industrial, commercial, residential, industrial, and institutional projects.",
    "Based in Richmond, British Columbia. Established 2009.",
  ],
  introEyebrow: "INTRODUCTION · 01",
  introBody: "Oceanicflo Construction is a company that provides construction management, project management, general contracting, design + build, and integrated project delivery services.",
  introSecondary:
    "The company works across specialized industrial, commercial, residential, industrial, and institutional projects — bringing owners, consultants, contractors, and operators into one coordinated working structure.",
  metricsEyebrow: "PORTFOLIO IN FIGURES · 02",
  servicesEyebrow: "SERVICES · 03",
  servicesHeading: "Five delivery structures for the way construction is organized today.",
  workEyebrow: "SELECTED WORK · 04",
  workHeading: "Recent projects across industrial, commercial, and institutional contexts.",
  galleryCaptions: [
    "SPECIALIZED INDUSTRIAL · 2023",
    "COMMERCIAL FIT-OUT · 2022",
    "RESIDENTIAL · 2023",
    "INSTITUTIONAL · 2022",
    "INDUSTRIAL WORKS · 2023",
    "SELECTED OTHER WORK · 2022",
  ],
  ctaEyebrow: "NEXT STEP · 05",
  ctaHeading: "Have a project in mind?",
  ctaBody: "Send Oceanicflo the details currently available. The team can follow up regarding requirements, scope, and next steps.",
} as const;

const ZH = {
  heroEyebrow: "OCEANICFLO · 卑詩省列治文 · 創立於 2009",
  heroTitleA: "以結構化的方式",
  heroTitleEm: "有條理地",
  heroTitleB: "完成施工。",
  heroLead:
    "Oceanicflo 是一家位於列治文的建築公司，提供整合式專案交付、設計與施工整合、總承包、施工管理及專案管理服務，涵蓋專業工業設施、商業空間、住宅、工業設施及機構設施等專案類型。",
  heroAlt: "Oceanicflo 專案中的混凝土施工細節。",
  heroDatums: [
    "在設計、製作及施工階段之間維持協調一致的專案交付。",
    "業主、顧問、承包商及營運人員在同一合作架構下進行。",
    "涵蓋專業工業、商業、住宅、工業及機構等專案類型。",
    "總公司位於卑詩省列治文，創立於 2009 年。",
  ],
  introEyebrow: "簡介 · 01",
  introBody: "Oceanicflo 是一家提供施工管理、專案管理、總承包、設計與施工整合，以及整合式專案交付服務的建築公司。",
  introSecondary:
    "服務涵蓋專業工業設施、商業空間、住宅、工業設施及機構設施等專案類型，讓業主、顧問、承包商及營運人員在同一合作架構下協同工作。",
  metricsEyebrow: "作品數據 · 02",
  servicesEyebrow: "服務 · 03",
  servicesHeading: "五種交付架構，對應現今施工組織的方式。",
  workEyebrow: "精選專案 · 04",
  workHeading: "跨工業、商業及機構等領域的近期專案。",
  galleryCaptions: [
    "專業工業設施 · 2023",
    "商業空間 · 2022",
    "住宅 · 2023",
    "機構設施 · 2022",
    "工業設施 · 2023",
    "其他精選專案 · 2022",
  ],
  ctaEyebrow: "下一步 · 05",
  ctaHeading: "有專案想討論？",
  ctaBody: "請將目前可提供的資料寄給 Oceanicflo，我們將就需求、範圍及下一步與您聯絡。",
} as const;