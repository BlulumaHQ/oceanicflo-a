import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().trim().min(1).max(120),
  lastName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(60).optional().default(""),
  company: z.string().trim().max(200).optional().default(""),
  service: z.string().trim().max(120).optional().default(""),
  type: z.string().trim().max(120).optional().default(""),
  location: z.string().trim().max(200).optional().default(""),
  timeline: z.string().trim().max(120).optional().default(""),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(4000),
  website: z.string().max(0).optional().default(""),
  lang: z.enum(["en", "zh"]).default("en"),
});

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try { payload = await request.json(); }
        catch { return Response.json({ ok: false, error: "invalid_json" }, { status: 400 }); }
        const parsed = schema.safeParse(payload);
        if (!parsed.success) return Response.json({ ok: false, error: "invalid_input" }, { status: 400 });
        const data = parsed.data;
        if (data.website) return Response.json({ ok: true });

        const apiKey = process.env.RESEND_API_KEY;
        const to = process.env.CONTACT_TO_EMAIL || "cary@oceanicflo.com";
        const from = process.env.CONTACT_FROM_EMAIL || "Oceanicflo Website <noreply@oceanicflo.com>";
        if (!apiKey) {
          console.warn("[contact] RESEND_API_KEY not set; enquiry received but not delivered.");
          return Response.json({ ok: true, queued: true });
        }
        const subject = `[Oceanicflo · ${data.lang.toUpperCase()}] ${data.subject}`;
        const html = `
<div style="font-family:Manrope,Arial,sans-serif;color:#111214;line-height:1.6;">
  <h2 style="margin:0 0 12px">New project enquiry</h2>
  <p><strong>Name:</strong> ${escape(data.firstName)} ${escape(data.lastName)}<br/>
  <strong>Email:</strong> ${escape(data.email)}<br/>
  <strong>Phone:</strong> ${escape(data.phone)}<br/>
  <strong>Company:</strong> ${escape(data.company)}</p>
  <p><strong>Service:</strong> ${escape(data.service)}<br/>
  <strong>Type:</strong> ${escape(data.type)}<br/>
  <strong>Location:</strong> ${escape(data.location)}<br/>
  <strong>Timeline:</strong> ${escape(data.timeline)}</p>
  <p><strong>Subject:</strong> ${escape(data.subject)}</p>
  <p><strong>Message:</strong><br/>${escape(data.message).replace(/\n/g, "<br/>")}</p>
  <hr/><p style="color:#666;font-size:12px">Submitted via oceanicflo.com (${data.lang})</p>
</div>`;
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({ from, to: [to], reply_to: data.email, subject, html }),
          });
          if (!res.ok) {
            const body = await res.text();
            console.error("[contact] Resend failed", res.status, body);
            return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
          }
          return Response.json({ ok: true });
        } catch (err) {
          console.error("[contact] Resend threw", err);
          return Response.json({ ok: false, error: "delivery_error" }, { status: 502 });
        }
      },
    },
  },
});

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
