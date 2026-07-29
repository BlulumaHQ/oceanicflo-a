import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE, ALT_ROUTES } from "@/data/content";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls: string[] = [];
        for (const key of Object.keys(ALT_ROUTES) as Array<keyof typeof ALT_ROUTES>) {
          const pair = ALT_ROUTES[key];
          const enLoc = SITE.domain + pair.en;
          const zhLoc = SITE.domain + pair.zh;
          urls.push(entry(enLoc, enLoc, zhLoc));
          urls.push(entry(zhLoc, enLoc, zhLoc));
        }
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});

function entry(loc: string, en: string, zh: string) {
  return `  <url>\n    <loc>${loc}</loc>\n    <xhtml:link rel="alternate" hreflang="en-CA" href="${en}"/>\n    <xhtml:link rel="alternate" hreflang="zh-Hant-CA" href="${zh}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>\n    <changefreq>monthly</changefreq>\n  </url>`;
}
