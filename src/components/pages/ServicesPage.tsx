import { SiteLayout } from "@/components/site/Layout";
import { Datum } from "@/components/site/Datum";
import { FinalCTA } from "@/components/site/CTA";
import { SERVICES, STAGES, type Lang } from "@/data/content";

export function ServicesPage({ lang }: { lang: Lang }) {
  const t = lang === "en"
    ? { eyebrow: "SERVICES · OCEANICFLO", title: "Five delivery structures.", lead: "Oceanicflo organizes its work through five delivery structures. Each is intended to bring the participants, decisions, and construction activity into a clearer working relationship.", stagesEyebrow: "PROJECT SEQUENCE", stagesHeading: "How a project moves from planning to completion.", ctaEyebrow: "DISCUSS · SERVICES", ctaHeading: "Which structure fits the project?", ctaBody: "Send Oceanicflo the current information — service preference, project type, timing — and the team can follow up regarding suitability and next steps." }
    : { eyebrow: "服務 · OCEANICFLO", title: "五種交付架構。", lead: "Oceanicflo 透過五種交付架構組織工作，讓參與人員、決策及施工活動維持更清晰的合作關係。", stagesEyebrow: "專案流程", stagesHeading: "專案由規劃至完成的推進方式。", ctaEyebrow: "洽談 · 服務", ctaHeading: "哪一種架構適合您的專案？", ctaBody: "請提供目前的資料——想使用的服務、專案類型、預計時程——Oceanicflo 將就適用性及下一步與您聯絡。" };
  const services = SERVICES[lang];
  const stages = STAGES[lang];
  return (
    <SiteLayout lang={lang}>
      <section>
        <div className="container-editorial" style={{ paddingBlock: "clamp(80px, 12vw, 140px) clamp(60px, 8vw, 100px)" }}>
          <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginBottom: 24 }}>{t.eyebrow}</div>
          <h1 className={lang === "en" ? "display-en" : "display-cjk"} style={{ margin: 0, maxWidth: 1100 }}>{t.title}</h1>
          <p style={{ marginTop: 32, maxWidth: 720, fontSize: 18, color: "var(--of-graphite)", lineHeight: 1.75 }}>{t.lead}</p>
        </div>
      </section>
      <section style={{ background: "var(--of-paper)" }}>
        <div className="container-editorial" style={{ paddingBlock: "clamp(64px, 10vw, 120px)" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {services.map((s, i) => (
              <li key={s.num} className="reveal svc-row" style={{ display: "grid", gridTemplateColumns: "120px 1fr 1.6fr", gap: "clamp(24px, 4vw, 56px)", padding: "clamp(40px, 6vw, 72px) 0", borderTop: i === 0 ? "1px solid var(--of-hairline)" : "none", borderBottom: "1px solid var(--of-hairline)", alignItems: "start" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--of-yellow-ink)", background: "var(--of-yellow)", padding: "4px 8px", fontWeight: 700, alignSelf: "start", display: "inline-block", width: "fit-content" }}>SERVICE / {s.num}</div>
                <h2 style={{ margin: 0, fontFamily: lang === "en" ? "var(--of-font-sans)" : "var(--of-font-cjk)", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: lang === "en" ? "-0.025em" : "-0.01em", lineHeight: 1.15 }}>{s.title}</h2>
                <Datum>
                  {s.body.map((p, j) => (
                    <p key={j} style={{ margin: j === 0 ? 0 : "18px 0 0", color: "var(--of-graphite)", fontSize: 17, lineHeight: 1.8 }}>{p}</p>
                  ))}
                </Datum>
              </li>
            ))}
          </ul>
          <style>{`@media (max-width: 900px){ li.svc-row, .svc-row { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>
      <section>
        <div className="container-editorial" style={{ paddingBlock: "clamp(80px, 12vw, 140px)" }}>
          <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginBottom: 20 }}>{t.stagesEyebrow}</div>
          <h2 className={lang === "en" ? "display-en" : "display-cjk"} style={{ margin: 0, maxWidth: 900 }}>{t.stagesHeading}</h2>
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }} className="stages-grid">
            {stages.map((s) => (
              <div key={s.num} className="reveal" style={{ borderTop: "1px solid var(--of-yellow)", paddingTop: 24 }}>
                <div style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--of-yellow-ink)", background: "var(--of-yellow)", padding: "2px 6px", fontWeight: 700, display: "inline-block", marginBottom: 20 }}>{s.num}</div>
                <h3 style={{ margin: 0, fontFamily: lang === "en" ? "var(--of-font-sans)" : "var(--of-font-cjk)", fontSize: 20, fontWeight: 700, letterSpacing: lang === "en" ? "-0.02em" : "-0.01em" }}>{s.title}</h3>
                <p style={{ marginTop: 12, color: "var(--of-graphite)", fontSize: 14, lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <style>{`@media (max-width: 960px){ .stages-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 560px){ .stages-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>
      <FinalCTA lang={lang} eyebrow={t.ctaEyebrow} heading={t.ctaHeading} body={t.ctaBody} />
    </SiteLayout>
  );
}