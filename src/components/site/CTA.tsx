import { Link } from "@tanstack/react-router";
import type { Lang } from "@/data/content";
import { CTA, SITE } from "@/data/content";
import { ArrowRight } from "./Icons";

export function FinalCTA({ lang, eyebrow, heading, body, secondary = "call" }: { lang: Lang; eyebrow?: string; heading: string; body: string; secondary?: "call" | "none" }) {
  const cta = CTA[lang];
  return (
    <section style={{ background: "var(--of-ink)", color: "var(--of-bg)" }}>
      <div className="container-editorial" style={{ paddingBlock: "clamp(71px, 10.9vw, 133px)" }}>
        <div className="datum-block reveal" style={{ maxWidth: 900 }}>
          <span className="datum-line" aria-hidden="true" style={{ background: "var(--of-yellow)" }} />
          {eyebrow && <div className="eyebrow" style={{ color: "var(--of-yellow)", marginBottom: 24 }}>{eyebrow}</div>}
          <h2 style={{ fontFamily: lang === "en" ? "var(--of-font-sans)" : "var(--of-font-cjk)", fontWeight: 700, fontSize: "clamp(2.25rem, 5.4vw, 5rem)", lineHeight: lang === "en" ? 0.98 : 1.12, letterSpacing: lang === "en" ? "-0.035em" : "-0.02em", margin: 0 }}>{heading}</h2>
          <p style={{ marginTop: 28, maxWidth: 620, color: "var(--of-concrete)", fontSize: 17, lineHeight: 1.7 }}>{body}</p>
          <div style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link to={lang === "en" ? "/contact" : "/zh/contact"} className="btn btn-primary">{cta.discuss} <ArrowRight /></Link>
            {secondary === "call" && (<a href={SITE.telLink} className="btn btn-secondary-inverse">{cta.callUs}</a>)}
          </div>
        </div>
      </div>
    </section>
  );
}