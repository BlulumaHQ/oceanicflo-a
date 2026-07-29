import { Link } from "@tanstack/react-router";
import { NAV, SITE, type Lang, CTA } from "@/data/content";
import { ArrowRight } from "./Icons";

export function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const nav = NAV[lang];
  const t = lang === "en"
    ? { statement: "Integrated project delivery, design + build, general contracting, construction management, and project management.", navLabel: "Navigate", headOffice: "Head Office", contact: "Contact", discuss: CTA.en.discuss }
    : { statement: "整合式專案交付、設計與施工整合、總承包、施工管理及專案管理。", navLabel: "網站導覽", headOffice: "總公司", contact: "聯絡", discuss: CTA.zh.discuss };
  return (
    <footer style={{ background: "var(--of-ink)", color: "var(--of-bg)" }}>
      <div style={{ height: 1, background: "var(--of-yellow)", opacity: 0.6 }} />
      <div className="container-editorial" style={{ paddingBlock: "72px 32px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32 }}>
          <div style={{ gridColumn: "span 4" }} className="footer-col">
            <img src="/images/oceanicflo/oceanicflo-logo.jpg" alt="Oceanicflo Construction" style={{ display: "block", height: 56, width: "auto" }} />
            <p style={{ marginTop: 24, color: "var(--of-concrete)", maxWidth: 340, fontSize: 14, lineHeight: 1.7 }}>{t.statement}</p>
          </div>
          <div style={{ gridColumn: "span 2" }} className="footer-col">
            <div className="foot-label">{t.navLabel}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {nav.map((n) => (<li key={n.to}><Link to={n.to} className="foot-link">{n.label}</Link></li>))}
            </ul>
          </div>
          <div style={{ gridColumn: "span 3" }} className="footer-col">
            <div className="foot-label">{t.headOffice}</div>
            <div style={{ color: "var(--of-concrete)", fontSize: 14, lineHeight: 1.75 }}>
              {SITE.address.line1}<br />{SITE.address.line2}<br />{SITE.address.line3}
            </div>
          </div>
          <div style={{ gridColumn: "span 3" }} className="footer-col">
            <div className="foot-label">{t.contact}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <a href={SITE.telLink} className="foot-link">{SITE.telDisplay}</a>
              <a href={`mailto:${SITE.email}`} className="foot-link">{SITE.email}</a>
              <Link to={lang === "en" ? "/contact" : "/zh/contact"} className="foot-cta">{t.discuss} <ArrowRight /></Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container-editorial" style={{ paddingBlock: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, fontSize: 12, color: "var(--of-concrete)" }}>
          <div>
            © {year} Oceanicflo Construction. All rights reserved. | Web Design by{" "}
            <a href="https://sonykundesign.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--of-bg)", textDecoration: "underline", textUnderlineOffset: 3 }}>Sonykun Design</a>
          </div>
          <div style={{ letterSpacing: "0.14em" }}>RICHMOND · BC · CANADA</div>
        </div>
      </div>
      <style>{`
        .foot-label { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--of-concrete); margin-bottom: 16px; }
        html[lang^="zh"] .foot-label { letter-spacing: 0.08em; text-transform: none; }
        .foot-link { color: var(--of-bg); text-decoration: none; opacity: 0.85; transition: color 200ms, opacity 200ms; font-size: 14px; }
        .foot-link:hover { color: var(--of-yellow); opacity: 1; }
        .foot-cta { color: var(--of-yellow); text-decoration: none; font-weight: 600; margin-top: 6px; display: inline-flex; align-items: center; gap: 10px; font-size: 14px; }
        .foot-lang { color: var(--of-concrete); text-decoration: none; font-size: 12px; letter-spacing: 0.12em; font-weight: 600; }
        .foot-lang.active { color: var(--of-yellow); }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } .footer-col { grid-column: span 1 !important; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}