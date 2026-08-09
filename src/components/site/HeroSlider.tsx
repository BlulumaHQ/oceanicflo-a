import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "@/components/site/Icons";
import type { Lang } from "@/data/content";

export type HeroSlide = {
  image: string;
  alt: string;
  eyebrow: string;
  titleA: string;
  titleEm: string;
  titleB: string;
  lead: string;
  services?: readonly string[];
  objectPosition?: string;
};

export function HeroSlider({
  lang,
  slides,
  ctaPrimary,
}: {
  lang: Lang;
  slides: readonly HeroSlide[];
  ctaPrimary: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), 7000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section
      aria-roledescription="carousel"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--of-ink)",
        minHeight: "clamp(560px, 88vh, 960px)",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* Background layers */}
      {slides.map((s, i) => (
        <div
          key={s.image + i}
          aria-hidden={i !== active}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === active ? 1 : 0,
            transition: "opacity 1200ms ease",
          }}
        >
          <img
            src={s.image}
            alt={i === active ? s.alt : ""}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: s.objectPosition ?? "center center",
              display: "block",
              transform: i === active ? "scale(1.04)" : "scale(1)",
              transition: "transform 8000ms linear",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(17,18,20,0.55) 0%, rgba(17,18,20,0.35) 38%, rgba(17,18,20,0.88) 100%)",
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div
        className="container-editorial"
        style={{ position: "relative", paddingBlock: "clamp(71px, 10.9vw, 118px) clamp(36px, 5.5vw, 65px)", width: "100%" }}
      >
        {slides.map((s, i) => (
          <div
            key={"copy" + i}
            style={{
              display: i === active ? "block" : "none",
              maxWidth: 980,
              animation: "fade-in 900ms ease both",
            }}
          >
            <div
              className={lang === "en" ? "eyebrow" : "eyebrow-cjk"}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, color: "rgba(243,241,235,0.82)" }}
            >
              <span style={{ width: 32, height: 1, background: "var(--of-yellow)" }} aria-hidden="true" />
              {s.eyebrow}
            </div>
            <h1
              className={lang === "en" ? "display-en-xl" : "display-cjk"}
              style={{ margin: 0, color: "var(--of-bg)" }}
            >
              {s.titleA}
              <br />
              {lang === "en" ? (
                <em className="serif-em" style={{ color: "var(--of-yellow)" }}>{s.titleEm}</em>
              ) : (
                <span className="serif-em-cjk" style={{ color: "var(--of-yellow)" }}>{s.titleEm}</span>
              )}
              <br />
              {s.titleB}
            </h1>
            <p style={{ marginTop: 28, maxWidth: 620, fontSize: 17, color: "rgba(243,241,235,0.86)", lineHeight: 1.75 }}>
              {s.lead}
            </p>
            {s.services && s.services.length > 0 && (
              <ul
                style={{
                  margin: "28px 0 0",
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px 24px",
                  maxWidth: 720,
                }}
              >
                {s.services.map((svc) => (
                  <li
                    key={svc}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(243,241,235,0.92)",
                    }}
                  >
                    <span style={{ width: 18, height: 2, background: "var(--of-yellow)" }} aria-hidden="true" />
                    {svc}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
          <Link to={lang === "en" ? "/contact" : "/zh/contact"} className="btn btn-primary">
            {ctaPrimary} <ArrowRight />
          </Link>
        </div>

        {/* Slide indicators */}
        <div style={{ marginTop: 32, display: "flex", gap: 16, alignItems: "center" }}>
          {slides.map((s, i) => (
            <button
              key={"dot" + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${lang === "en" ? "Slide" : "第"} ${i + 1}${lang === "en" ? "" : " 張"}`}
              aria-current={i === active}
              style={{
                background: "transparent",
                border: 0,
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: i === active ? 56 : 24,
                  height: 2,
                  background: i === active ? "var(--of-yellow)" : "rgba(243,241,235,0.4)",
                  transition: "width 400ms ease, background-color 400ms ease",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: i === active ? "var(--of-bg)" : "rgba(243,241,235,0.5)",
                }}
              >
                0{i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
