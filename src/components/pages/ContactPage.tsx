import { SiteLayout } from "@/components/site/Layout";
import { ContactForm } from "@/components/site/ContactForm";
import { Datum } from "@/components/site/Datum";
import { SITE, FORM_LABELS, type Lang } from "@/data/content";

export function ContactPage({ lang }: { lang: Lang }) {
  const t = lang === "en"
    ? {
        eyebrow: "CONTACT · OCEANICFLO",
        title: "Discuss your project.",
        lead: "Send Oceanicflo the details currently available. The team will follow up regarding requirements, scope, and next steps.",
        headOffice: "HEAD OFFICE",
        contact: "CONTACT",
        hours: "HOURS",
        hoursValue: "Monday–Friday · By appointment",
        directions: "Open in Maps",
      }
    : {
        eyebrow: "聯絡 · OCEANICFLO",
        title: "洽談您的專案。",
        lead: "請將目前可提供的資料寄給 Oceanicflo，我們將就需求、範圍及下一步與您聯絡。",
        headOffice: "總公司",
        contact: "聯絡",
        hours: "營業時間",
        hoursValue: "週一至週五 · 預約制",
        directions: "以地圖查看",
      };
  const labels = FORM_LABELS[lang];
  return (
    <SiteLayout lang={lang}>
      <section>
        <div className="container-editorial" style={{ paddingBlock: "clamp(59px, 9.4vw, 104px) clamp(36px, 4.7vw, 59px)" }}>
          <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginBottom: 24 }}>{t.eyebrow}</div>
          <h1 className={lang === "en" ? "display-en" : "display-cjk"} style={{ margin: 0 }}>{t.title}</h1>
          <p style={{ marginTop: 28, maxWidth: 720, fontSize: 18, color: "var(--of-graphite)", lineHeight: 1.75 }}>{t.lead}</p>
        </div>
      </section>
      <section style={{ background: "var(--of-paper)" }}>
        <div className="container-editorial" style={{ paddingBlock: "clamp(44px, 7.8vw, 89px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "clamp(30px, 4.7vw, 71px)" }} className="contact-grid">
            <div>
              <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginBottom: 24 }}>{labels.heading}</div>
              <p style={{ margin: "0 0 32px", color: "var(--of-graphite)", fontSize: 16, lineHeight: 1.7, maxWidth: 620 }}>{labels.support}</p>
              <ContactForm lang={lang} />
            </div>
            <aside style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <Datum number="A" label={t.headOffice}>
                <div style={{ fontSize: 17, lineHeight: 1.7 }}>{SITE.address.line1}<br />{SITE.address.line2}<br />{SITE.address.line3}</div>
                <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 16, color: "var(--of-yellow-ink)", background: "var(--of-yellow)", padding: "6px 12px", fontSize: 12, letterSpacing: "0.14em", fontWeight: 700, textDecoration: "none" }}>{t.directions} →</a>
              </Datum>
              <Datum number="B" label={t.contact}>
                <div style={{ fontSize: 17, lineHeight: 1.7 }}>
                  <a href={SITE.telLink} style={{ color: "var(--of-ink)", textDecoration: "none", borderBottom: "1px solid var(--of-hairline)" }}>{SITE.telDisplay}</a><br />
                  <a href={`mailto:${SITE.email}`} style={{ color: "var(--of-ink)", textDecoration: "none", borderBottom: "1px solid var(--of-hairline)" }}>{SITE.email}</a>
                </div>
              </Datum>
              <Datum number="C" label={t.hours}>
                <div style={{ fontSize: 17, lineHeight: 1.7 }}>{t.hoursValue}</div>
              </Datum>
            </aside>
          </div>
          <style>{`@media (max-width: 960px){ .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>
    </SiteLayout>
  );
}