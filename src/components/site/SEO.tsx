import { SITE, ALT_ROUTES, type Lang } from "@/data/content";

type MetaEntry = { title?: string; charSet?: string; name?: string; content?: string; property?: string };
type LinkEntry = { rel: string; href: string; hrefLang?: string; type?: string; sizes?: string };

export interface SeoInput {
  lang: Lang;
  routeKey: keyof typeof ALT_ROUTES;
  title: string;
  description: string;
  ogImage?: string;
  structuredData?: object | object[];
}

export function buildHead(input: SeoInput): { meta: MetaEntry[]; links: LinkEntry[]; scripts?: Array<{ type: string; children: string }> } {
  const pair = ALT_ROUTES[input.routeKey];
  const enUrl = SITE.domain + pair.en;
  const zhUrl = SITE.domain + pair.zh;
  const canonical = input.lang === "en" ? enUrl : zhUrl;
  const ogImgAbs = input.ogImage ? SITE.domain + input.ogImage : undefined;

  const meta: MetaEntry[] = [
    { title: input.title },
    { name: "description", content: input.description },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    { property: "og:site_name", content: "Oceanicflo Construction" },
    { property: "og:locale", content: input.lang === "en" ? "en_CA" : "zh_TW" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
  ];
  if (ogImgAbs) {
    meta.push({ property: "og:image", content: ogImgAbs });
    meta.push({ name: "twitter:image", content: ogImgAbs });
  }

  const links: LinkEntry[] = [
    { rel: "canonical", href: canonical },
    { rel: "alternate", hrefLang: "en-CA", href: enUrl },
    { rel: "alternate", hrefLang: "zh-Hant-CA", href: zhUrl },
    { rel: "alternate", hrefLang: "x-default", href: enUrl },
  ];

  const scripts = input.structuredData
    ? [{ type: "application/ld+json", children: JSON.stringify(input.structuredData) }]
    : undefined;

  return { meta, links, scripts };
}

export const LOCAL_BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Oceanicflo Construction",
  url: SITE.domain + "/",
  telephone: "+1-604-818-2088",
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "203-2680 Shell Road",
    addressLocality: "Richmond",
    addressRegion: "British Columbia",
    postalCode: "V6X 4C9",
    addressCountry: "CA",
  },
};

export function breadcrumbLd(_lang: Lang, trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: SITE.domain + t.path,
    })),
  };
}