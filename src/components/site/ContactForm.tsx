import { useState } from "react";
import { FORM_LABELS, FORM_OPTIONS, type Lang } from "@/data/content";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ lang }: { lang: Lang }) {
  const t = FORM_LABELS[lang];
  const opts = FORM_OPTIONS[lang];
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    payload.lang = lang;

    const nextErrors: Record<string, string> = {};
    if (!payload.firstName?.trim()) nextErrors.firstName = "!";
    if (!payload.lastName?.trim()) nextErrors.lastName = "!";
    if (!payload.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) nextErrors.email = "!";
    if (!payload.subject?.trim()) nextErrors.subject = "!";
    if (!payload.message?.trim()) nextErrors.message = "!";
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) { setStatus("success"); form.reset(); }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  }

  if (status === "success") {
    return (
      <div className="datum-block" style={{ paddingBlock: 40 }}>
        <span className="datum-line" aria-hidden="true" />
        <div className="eyebrow" style={{ marginBottom: 16 }}>{lang === "en" ? "MESSAGE RECEIVED" : "訊息已收到"}</div>
        <p style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", fontWeight: 600, lineHeight: 1.35, letterSpacing: lang === "en" ? "-0.02em" : "-0.01em", margin: 0 }}>{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-live="polite">
      <div className="form-grid">
        <Field name="firstName" label={t.first} required invalid={!!errors.firstName} />
        <Field name="lastName" label={t.last} required invalid={!!errors.lastName} />
        <Field name="email" label={t.email} required type="email" invalid={!!errors.email} />
        <Field name="phone" label={`${t.phone} · ${t.optional}`} type="tel" />
        <Field name="company" label={`${t.company} · ${t.optional}`} full />
        <SelectField name="service" label={`${t.service} · ${t.optional}`} options={opts.service} placeholder={t.select} />
        <SelectField name="type" label={`${t.type} · ${t.optional}`} options={opts.type} placeholder={t.select} />
        <Field name="location" label={`${t.location} · ${t.optional}`} />
        <SelectField name="timeline" label={`${t.timeline} · ${t.optional}`} options={opts.timeline} placeholder={t.select} />
        <Field name="subject" label={t.subject} required full invalid={!!errors.subject} />
        <TextAreaField name="message" label={t.message} required invalid={!!errors.message} />
      </div>
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: 12, color: "var(--of-graphite)", maxWidth: 460, lineHeight: 1.6, margin: 0 }}>{t.privacy}</p>
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.submit}
          <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
      {status === "error" && (
        <div role="alert" style={{ marginTop: 24, padding: "14px 16px", borderLeft: "2px solid var(--of-yellow)", background: "rgba(237,205,32,0.08)", fontSize: 14, color: "var(--of-graphite)" }}>{t.error}</div>
      )}
      {Object.keys(errors).length > 0 && (
        <div role="alert" style={{ marginTop: 16, fontSize: 12, color: "#8b1f1f" }}>{lang === "en" ? "Please complete the required fields." : "請填寫必填欄位。"}</div>
      )}
      <style>{`
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 26px 24px; }
        .form-grid .full { grid-column: 1 / -1; }
        @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
      `}</style>
    </form>
  );
}

function Field({ name, label, required, type = "text", full, invalid }: { name: string; label: string; required?: boolean; type?: string; full?: boolean; invalid?: boolean }) {
  return (
    <label className={full ? "full" : undefined}>
      <span className="field-label">{label}{required && <span style={{ color: "var(--of-yellow-ink)", background: "var(--of-yellow)", marginLeft: 6, padding: "0 4px" }}>*</span>}</span>
      <input className="field" name={name} type={type} required={required} aria-invalid={invalid || undefined} maxLength={type === "email" ? 254 : 400} />
    </label>
  );
}
function TextAreaField({ name, label, required, invalid }: { name: string; label: string; required?: boolean; invalid?: boolean }) {
  return (
    <label className="full">
      <span className="field-label">{label}{required && <span style={{ color: "var(--of-yellow-ink)", background: "var(--of-yellow)", marginLeft: 6, padding: "0 4px" }}>*</span>}</span>
      <textarea className="field" name={name} required={required} rows={5} maxLength={4000} aria-invalid={invalid || undefined} style={{ resize: "vertical", minHeight: 120 }} />
    </label>
  );
}
function SelectField({ name, label, options, placeholder }: { name: string; label: string; options: readonly string[]; placeholder: string }) {
  return (
    <label>
      <span className="field-label">{label}</span>
      <select className="field" name={name} defaultValue="" style={{ appearance: "none", paddingRight: 28 }}>
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}