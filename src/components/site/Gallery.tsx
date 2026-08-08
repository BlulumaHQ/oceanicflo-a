import { useState } from "react";
import { IMAGES } from "@/data/content";
import { Lightbox } from "./Lightbox";

export function SelectedWorkGallery({ captions, lang }: { captions: readonly string[]; lang: "en" | "zh" }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <>
      <div className="gallery-grid">
        {IMAGES.gallery.map((src, i) => (
          <button key={src} type="button" className={`gallery-cell g-${i + 1}`} onClick={() => setOpenIdx(i)}
            aria-label={`${captions[i]} — ${lang === "en" ? "open image" : "開啟圖像"}`}>
            <div className={`gallery-media${i === 1 ? " is-contain" : ""}`}>
              <img src={src} alt={captions[i]} loading={i < 2 ? "eager" : "lazy"} />
            </div>
            <div className="gallery-cap"><span className="dot" aria-hidden="true" />{captions[i]}</div>
          </button>
        ))}
      </div>
      {openIdx !== null && (
        <Lightbox images={IMAGES.gallery} captions={captions} index={openIdx} lang={lang}
          onClose={() => setOpenIdx(null)}
          onPrev={() => setOpenIdx((i) => (i! - 1 + IMAGES.gallery.length) % IMAGES.gallery.length)}
          onNext={() => setOpenIdx((i) => (i! + 1) % IMAGES.gallery.length)} />
      )}
      <style>{`
        .gallery-grid { display: grid; grid-template-columns: repeat(12, 1fr); grid-auto-rows: clamp(148px, 18.7vw, 237px); gap: clamp(12px, 1.9vw, 24px); }
        .gallery-cell { border: 0; background: transparent; padding: 0; text-align: left; cursor: pointer; display: flex; flex-direction: column; gap: 12px; color: inherit; }
        .gallery-media { overflow: hidden; background: var(--of-hairline); position: relative; width: 100%; flex: 1; min-height: 0; }
        .gallery-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 700ms ease; }
        .gallery-media.is-contain { background: #EDCD20; }
        .gallery-media.is-contain img { object-fit: contain; }
        .gallery-cell:hover .gallery-media img { transform: scale(1.03); }
        .gallery-cap { font-size: 11px; letter-spacing: 0.2em; font-weight: 600; color: var(--of-graphite); display: inline-flex; align-items: center; gap: 8px; }
        .gallery-cap .dot { width: 6px; height: 6px; background: var(--of-yellow); display: inline-block; }
        /* Row 1: wide landscape + square. Rows are uniform height via grid-auto-rows. */
        .g-1 { grid-column: span 8; grid-row: span 1; }
        .g-2 { grid-column: span 4; grid-row: span 1; }
        /* Row 2: three uniform tiles */
        .g-3 { grid-column: span 4; grid-row: span 1; }
        .g-4 { grid-column: span 4; grid-row: span 1; }
        .g-5 { grid-column: span 4; grid-row: span 1; }
        /* Row 3: full-width banner */
        .g-6 { grid-column: span 12; grid-row: span 1; }
        @media (max-width: 960px) {
          .gallery-grid { grid-template-columns: repeat(6, 1fr); grid-auto-rows: clamp(180px, 30vw, 260px); }
          .g-1 { grid-column: span 6; }
          .g-2 { grid-column: span 6; }
          .g-3, .g-4, .g-5 { grid-column: span 2; }
          .g-6 { grid-column: span 6; }
        }
        @media (max-width: 560px) {
          .gallery-grid { grid-template-columns: 1fr; grid-auto-rows: clamp(200px, 55vw, 280px); }
          .g-1, .g-2, .g-3, .g-4, .g-5, .g-6 { grid-column: span 1; }
        }
      `}</style>
    </>
  );
}