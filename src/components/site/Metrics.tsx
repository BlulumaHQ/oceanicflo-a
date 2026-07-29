import { METRICS, type Lang } from "@/data/content";

export function MetricsBlock({ lang, label }: { lang: Lang; label: string }) {
  const items = METRICS[lang];
  const note = METRICS.note[lang];
  return (
    <section style={{ background: "var(--of-bg)", borderTop: "1px solid var(--of-hairline)", borderBottom: "1px solid var(--of-hairline)" }}>
      <div className="container-editorial" style={{ paddingBlock: "clamp(72px, 10vw, 120px)" }}>
        <div className={lang === "en" ? "eyebrow" : "eyebrow-cjk"} style={{ marginBottom: 44 }}>{label}</div>
        <ul className="metrics-row" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((m, i) => (
            <li key={m.label} className="metric-item reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="metric-index">0{i + 1}</div>
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 40, fontSize: 12, color: "var(--of-graphite)", letterSpacing: lang === "en" ? "0.04em" : "0.02em" }}>{note}</p>
      </div>
      <style>{`
        .metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--of-hairline); }
        .metric-item { padding: 32px 28px 32px 0; border-right: 1px solid var(--of-hairline); position: relative; }
        .metric-item:last-child { border-right: 0; padding-right: 0; }
        .metric-index { font-size: 10px; letter-spacing: 0.24em; color: var(--of-yellow-ink); background: var(--of-yellow); display: inline-block; padding: 2px 6px; margin-bottom: 24px; font-weight: 700; }
        .metric-value { font-family: var(--of-font-sans); font-weight: 700; font-size: clamp(2.75rem, 6vw, 4.75rem); line-height: 1; letter-spacing: -0.04em; color: var(--of-ink); }
        .metric-label { margin-top: 14px; font-size: 13px; color: var(--of-graphite); line-height: 1.5; max-width: 220px; }
        @media (max-width: 900px) { .metrics-row { grid-template-columns: 1fr 1fr; } .metric-item:nth-child(2n) { border-right: 0; } .metric-item { padding-right: 20px; } }
        @media (max-width: 520px) { .metrics-row { grid-template-columns: 1fr; } .metric-item { border-right: 0; border-bottom: 1px solid var(--of-hairline); } .metric-item:last-child { border-bottom: 0; } }
      `}</style>
    </section>
  );
}