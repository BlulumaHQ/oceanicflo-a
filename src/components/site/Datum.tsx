import type { ReactNode } from "react";

export function Datum({ children, number, label }: { children: ReactNode; number?: string; label?: string }) {
  return (
    <div className="datum-block">
      <span className="datum-line" aria-hidden="true" />
      {(number || label) && (
        <div style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--of-graphite)", marginBottom: 14, textTransform: "uppercase", fontWeight: 600 }}>
          {number && <span style={{ color: "var(--of-yellow-ink)", background: "var(--of-yellow)", padding: "2px 6px", marginRight: 10 }}>{number}</span>}
          {label}
        </div>
      )}
      {children}
    </div>
  );
}