import { SiteLayout } from "@/components/site/Layout";
import { Datum } from "@/components/site/Datum";
import { FinalCTA } from "@/components/site/CTA";
import { MetricsBlock } from "@/components/site/Metrics";
import { IMAGES, type Lang } from "@/data/content";

export function AboutPage({ lang }: { lang: Lang }) {
  const t = lang === "en"
    ? {
        eyebrow: "ABOUT · OCEANICFLO",
        title: "A construction company organized around clarity.",
        lead: "Oceanicflo Construction, based in Richmond, British Columbia, works across specialized industrial, commercial, residential, industrial, and institutional projects — organizing owners, consultants, contractors, and operators inside one working structure.",
        pillars: [
          { num: "01", title: "Coordination", body: "Bring owners, consultants, contractors, and operators into a clearer working structure through each phase of a project." },
          { num: "02", title: "Execution", body: "Coordinate labour, materials, equipment, subcontractors, and the quality of work performed during construction." },
          { num: "03", title: "Completion", body: "Move the project to an organized conclusion with clear communication and structured closeout." },
        ],
        metricsEyebrow: "PORTFOLIO IN FIGURES · 02",
        ctaEyebrow: "NEXT STEP",
        ctaHeading: "Work with Oceanicflo.",
        ctaBody: "Oceanicflo is set up to review requirements, discuss the appropriate delivery structure, and follow up with the next steps.",
      }
    : {
        eyebrow: "關於 · OCEANICFLO",
        title: "以清晰結構為核心的建築公司。",
        lead: "Oceanicflo Construction 總公司位於卑詩省列治文，服務涵蓋專業工業設施、商業空間、住宅、工業設施及機構設施，讓業主、顧問、承包商及營運人員在同一合作架構下協同工作。",
        pillars: [
          { num: "01", title: "協調", body: "在專案各階段，將業主、顧問、承包商及營運人員納入更清晰的合作架構。" },
          { num: "02", title: "執行", body: "統籌施工所需的人工、材料、設備、分包商，並監督施工過程中的工作品質。" },
          { num: "03", title: "完成", body: "透過清楚的溝通與有組織的收尾程序，讓專案順利完成。" },
        ],
        metricsEyebrow: "作品數據 · 02",
        ctaEyebrow: "下一步",
        ctaHeading: "與 Oceanicflo 合作。",
        ctaBody: "Oceanicflo 可協助檢視需求、討論合適的交付架構，並就下一步與您聯絡。",
      };
  return (
    <SiteLayout lang={lang}>
      <section>
        <div className="container-editorial" style={{ paddingBlock: "clamp(59px, 9.4vw, 104px) clamp(44px, 6.2vw, 74px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: "clamp(21px, 4.7vw, 71px)", alignItems: "end" }} className="about-hero">
            <div>
              <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginBottom: 24 }}>{t.eyebrow}</div>
              <h1 className={lang === "en" ? "display-en" : "display-cjk"} style={{ margin: 0 }}>{t.title}</h1>
              <p style={{ marginTop: 32, maxWidth: 620, fontSize: 18, color: "var(--of-graphite)", lineHeight: 1.75 }}>{t.lead}</p>
            </div>
            <figure style={{ margin: 0, aspectRatio: "3/4", background: "var(--of-hairline)", overflow: "hidden" }}>
              <img src={IMAGES.gallery[0]} alt="Oceanicflo project detail" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </figure>
          </div>
          <style>{`@media (max-width: 900px){ .about-hero { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>
      <section style={{ background: "var(--of-paper)" }}>
        <div className="container-editorial" style={{ paddingBlock: "clamp(53px, 7.8vw, 89px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(18px, 3.1vw, 47px)" }} className="pillars-grid">
            {t.pillars.map((p) => (
              <Datum key={p.num} number={p.num} label={lang === "en" ? "PRINCIPLE" : "原則"}>
                <h3 style={{ margin: 0, fontFamily: lang === "en" ? "var(--of-font-sans)" : "var(--of-font-cjk)", fontSize: "clamp(1.5rem,2.4vw,2rem)", fontWeight: 700, letterSpacing: lang === "en" ? "-0.02em" : "-0.01em", lineHeight: 1.2 }}>{p.title}</h3>
                <p style={{ marginTop: 18, color: "var(--of-graphite)", fontSize: 16, lineHeight: 1.75 }}>{p.body}</p>
              </Datum>
            ))}
          </div>
          <style>{`@media (max-width: 900px){ .pillars-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>
      <MetricsBlock lang={lang} label={t.metricsEyebrow} />
      <FinalCTA lang={lang} eyebrow={t.ctaEyebrow} heading={t.ctaHeading} body={t.ctaBody} />
    </SiteLayout>
  );
}