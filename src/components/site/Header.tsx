import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { NAV, CTA, type Lang } from "@/data/content";
import { MenuIcon, CloseIcon, ArrowRight } from "./Icons";

export function Header({ lang }: { lang: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const nav = NAV[lang];
  const cta = CTA[lang];

  return (
    <>
      <a href="#main" className="skip-link">{lang === "en" ? "Skip to content" : "跳至主要內容"}</a>
      <header
        className={`site-header ${scrolled ? "is-scrolled" : ""}`}
        style={{
          position: "sticky", top: 0, zIndex: 50,
          backdropFilter: scrolled ? "saturate(140%) blur(10px)" : "none",
          background: scrolled ? "rgba(243,241,235,0.86)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--of-hairline)" : "1px solid transparent",
          transition: "background 300ms ease, border-color 300ms ease",
        }}
      >
        <div className="container-editorial" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 80 }}>
          <Link to={lang === "en" ? "/" : "/zh"} className="brand-mark" aria-label="Oceanicflo Construction — home">
            <img src="/images/oceanicflo/oceanicflo-logo.jpg" alt="Oceanicflo Construction" width={180} height={54} />
          </Link>
          <nav aria-label="Primary" className="primary-nav">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="nav-link" activeOptions={{ exact: true }} activeProps={{ "aria-current": "page" } as never}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-tail">
            <span
              className="lang-switch is-disabled"
              aria-disabled="true"
              title="Language switcher disabled"
            >
              <span className={lang === "en" ? "active" : ""}>EN</span>
              <span aria-hidden="true"> / </span>
              <span className={lang === "zh" ? "active" : ""}>繁中</span>
            </span>
            <Link to={lang === "en" ? "/contact" : "/zh/contact"} className="btn btn-primary hidden-mobile">
              {cta.discuss}<ArrowRight />
            </Link>
            <button className="menu-btn" aria-label={open ? (lang === "en" ? "Close menu" : "關閉選單") : lang === "en" ? "Open menu" : "開啟選單"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>
      {open && <MobileMenu lang={lang} onClose={() => setOpen(false)} />}
      <style>{`
        .skip-link { position: absolute; left: -9999px; top: 0; background: var(--of-ink); color: var(--of-bg); padding: 8px 14px; z-index: 100; }
        .skip-link:focus { left: 12px; top: 12px; }
        .brand-mark { display: inline-flex; text-decoration: none; }
        .brand-mark img { display: block; height: 48px; width: auto; object-fit: contain; }
        .primary-nav { display: flex; gap: 34px; align-items: center; }
        .header-tail { display: flex; align-items: center; gap: 18px; }
        .lang-switch { color: var(--of-ink); text-decoration: none; font-size: 12px; letter-spacing: 0.14em; font-weight: 600; }
        .lang-switch .active { color: var(--of-yellow-ink); border-bottom: 1px solid var(--of-yellow); padding-bottom: 2px; }
        .lang-switch.is-disabled { opacity: 0.35; pointer-events: none; cursor: not-allowed; user-select: none; }
        .lang-switch.is-disabled .active { border-bottom-color: transparent; color: inherit; }
        .menu-btn { display: none; background: transparent; border: 1px solid var(--of-hairline); width: 44px; height: 44px; align-items: center; justify-content: center; color: var(--of-ink); cursor: pointer; border-radius: 2px; }
        .hidden-mobile { display: inline-flex; }
        @media (max-width: 960px) {
          .primary-nav { display: none; }
          .hidden-mobile { display: none; }
          .menu-btn { display: inline-flex; }
        }
      `}</style>
    </>
  );
}

function MobileMenu({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const nav = NAV[lang];
  const cta = CTA[lang];
  return (
    <div role="dialog" aria-modal="true" aria-label={lang === "en" ? "Menu" : "選單"}
      style={{ position: "fixed", inset: 0, zIndex: 60, background: "var(--of-bg)", overflowY: "auto" }}>
      <div className="container-editorial" style={{ paddingTop: 24, paddingBottom: 40 }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 40 }}>
          <button onClick={onClose} aria-label={lang === "en" ? "Close menu" : "關閉選單"}
            style={{ background: "transparent", border: "1px solid var(--of-ink)", width: 44, height: 44, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {nav.map((n, i) => (
            <Link key={n.to} to={n.to}
              style={{
                fontFamily: lang === "en" ? "var(--of-font-sans)" : "var(--of-font-cjk)",
                fontWeight: 700, fontSize: "clamp(2rem, 8vw, 3.25rem)",
                letterSpacing: lang === "en" ? "-0.03em" : "-0.01em",
                color: "var(--of-ink)", textDecoration: "none", lineHeight: 1.15,
                borderTop: "1px solid var(--of-hairline)", padding: "18px 0",
                display: "flex", alignItems: "baseline", gap: 16,
              }}>
              <span style={{ fontSize: 12, color: "var(--of-yellow-ink)", background: "var(--of-yellow)", padding: "2px 6px", fontWeight: 700, minWidth: 34, textAlign: "center", letterSpacing: "0.1em" }}>0{i + 1}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 14 }}>
          <Link to={lang === "en" ? "/contact" : "/zh/contact"} className="btn btn-primary" onClick={onClose}>
            {cta.discuss} <ArrowRight />
          </Link>
        </div>
        <div style={{ marginTop: 48, borderTop: "1px solid var(--of-hairline)", paddingTop: 24, color: "var(--of-graphite)", fontSize: 14 }}>
          <div>203-2680 Shell Road, Richmond, BC V6X 4C9</div>
          <div style={{ marginTop: 6 }}>
            <a href="tel:+16048182088" style={{ color: "inherit", textDecoration: "none" }}>604-818-2088</a>
            <span aria-hidden="true"> · </span>
            <a href="mailto:cary@oceanicflo.com" style={{ color: "inherit", textDecoration: "none" }}>cary@oceanicflo.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}