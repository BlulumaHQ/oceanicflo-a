import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, CloseIcon } from "./Icons";

export function Lightbox({
  images, index, onClose, onPrev, onNext, captions, lang,
}: {
  images: readonly string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  captions: readonly string[];
  lang: "en" | "zh";
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose, onPrev, onNext]);

  const prevLabel = lang === "en" ? "Previous image" : "上一張";
  const nextLabel = lang === "en" ? "Next image" : "下一張";
  const closeLabel = lang === "en" ? "Close lightbox" : "關閉";

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={lang === "en" ? "Image viewer" : "圖像檢視器"}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(17,18,20,0.96)", display: "flex", flexDirection: "column" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--of-bg)" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--of-yellow)", fontWeight: 600 }}>{captions[index]}</div>
        <button onClick={onClose} aria-label={closeLabel} className="lb-btn"><CloseIcon /></button>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 clamp(12px, 3.1vw, 44px)" }}>
        <button onClick={onPrev} aria-label={prevLabel} className="lb-btn lb-side"><ChevronLeft /></button>
        <img src={images[index]} alt={captions[index]} style={{ maxWidth: "min(1400px, 100%)", maxHeight: "80vh", objectFit: "contain" }} />
        <button onClick={onNext} aria-label={nextLabel} className="lb-btn lb-side"><ChevronRight /></button>
      </div>
      <div style={{ textAlign: "center", padding: 20, color: "var(--of-concrete)", fontSize: 12, letterSpacing: "0.14em" }}>{index + 1} / {images.length}</div>
      <style>{`
        .lb-btn { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: var(--of-bg); width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 2px; transition: background 200ms, border-color 200ms; }
        .lb-btn:hover { background: rgba(255,255,255,0.08); border-color: var(--of-yellow); color: var(--of-yellow); }
        .lb-side { margin: 0 12px; }
      `}</style>
    </div>
  );
}