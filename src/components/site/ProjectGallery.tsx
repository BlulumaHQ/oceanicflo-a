import { useEffect, useState } from "react";
import { Lightbox } from "./Lightbox";
import { ChevronLeft, ChevronRight } from "./Icons";
import type { Lang } from "@/data/content";

export function ProjectGallery({
  images,
  lang,
  title,
}: {
  images: Array<{ url: string; alt: string; caption: string | null }>;
  lang: Lang;
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const total = images.length;

  useEffect(() => {
    if (!playing || total < 2 || lightbox) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % total), 4500);
    return () => window.clearInterval(t);
  }, [playing, total, lightbox]);

  if (total === 0) return null;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const captions = images.map((im) => im.caption || im.alt || title);

  return (
    <div className="pg">
      <div className="pg-stage">
        <button
          type="button"
          className="pg-open"
          onClick={() => setLightbox(true)}
          aria-label={lang === "en" ? "Open image full screen" : "全螢幕檢視圖像"}
        >
          <img src={images[index].url} alt={images[index].alt || title} />
        </button>
        {total > 1 && (
          <>
            <button type="button" className="pg-nav pg-prev" onClick={prev} aria-label={lang === "en" ? "Previous image" : "上一張"}><ChevronLeft /></button>
            <button type="button" className="pg-nav pg-next" onClick={next} aria-label={lang === "en" ? "Next image" : "下一張"}><ChevronRight /></button>
          </>
        )}
      </div>
      <div className="pg-bar">
        <span className="pg-count">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        {images[index].caption && <span className="pg-cap">{images[index].caption}</span>}
        {total > 1 && (
          <button type="button" className="pg-play" onClick={() => setPlaying((p) => !p)}>
            {playing
              ? lang === "en" ? "PAUSE SLIDESHOW" : "暫停播放"
              : lang === "en" ? "PLAY SLIDESHOW" : "自動播放"}
          </button>
        )}
      </div>
      {total > 1 && (
        <div className="pg-thumbs">
          {images.map((im, i) => (
            <button
              key={im.url + i}
              type="button"
              className={`pg-thumb${i === index ? " is-active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`${lang === "en" ? "Image" : "圖像"} ${i + 1}`}
              aria-current={i === index}
            >
              <img src={im.url} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
      {lightbox && (
        <Lightbox
          images={images.map((im) => im.url)}
          captions={captions}
          index={index}
          lang={lang}
          onClose={() => setLightbox(false)}
          onPrev={prev}
          onNext={next}
        />
      )}
      <style>{`
        .pg-stage { position: relative; background: var(--of-hairline); }
        .pg-open { display: block; width: 100%; border: 0; padding: 0; background: transparent; cursor: zoom-in; }
        .pg-open img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; display: block; }
        .pg-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border: 1px solid rgba(255,255,255,0.35); background: rgba(17,18,20,0.5); color: #fff; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
        .pg-nav:hover { background: var(--of-yellow); color: var(--of-yellow-ink); border-color: var(--of-yellow); }
        .pg-prev { left: 12px; } .pg-next { right: 12px; }
        .pg-bar { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; padding: 12px 0; border-bottom: 1px solid var(--of-hairline); }
        .pg-count { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; color: var(--of-ink); }
        .pg-cap { font-size: 13px; color: var(--of-graphite); }
        .pg-play { margin-left: auto; background: transparent; border: 1px solid var(--of-hairline); font-size: 11px; font-weight: 700; letter-spacing: 0.16em; padding: 6px 12px; cursor: pointer; color: var(--of-graphite); }
        .pg-play:hover { border-color: var(--of-yellow); color: var(--of-ink); }
        .pg-thumbs { display: grid; grid-template-columns: repeat(auto-fill, minmax(88px, 1fr)); gap: 8px; margin-top: 14px; }
        .pg-thumb { border: 0; padding: 0; background: transparent; cursor: pointer; opacity: 0.55; transition: opacity 200ms, outline-color 200ms; outline: 2px solid transparent; }
        .pg-thumb img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; }
        .pg-thumb:hover { opacity: 0.85; }
        .pg-thumb.is-active { opacity: 1; outline-color: var(--of-yellow); }
      `}</style>
    </div>
  );
}