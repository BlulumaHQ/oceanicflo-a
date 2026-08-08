import { queryOptions } from "@tanstack/react-query";

/**
 * BluLuma CMS — read-only public views.
 * Publishable key only; all queries scoped to the Oceanicflo client id.
 */
const CMS_URL = "https://uzdjwpkgldzhnoxjeyrw.supabase.co/rest/v1";
const CMS_KEY = "sb_publishable_ifsg2zxajGqu19GsJ2X4RQ_KHBHGIvi";
export const OCEANICFLO_CLIENT_ID = "cb924989-ff42-40e0-944c-8bee4a98dafc";

async function cms<T>(view: string, params: Record<string, string>): Promise<T[]> {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${CMS_URL}/${view}?${qs}`, {
    headers: { apikey: CMS_KEY, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`CMS read failed (${view}): ${res.status}`);
  return (await res.json()) as T[];
}

export interface CmsItem {
  id: string;
  title: string;
  title_zh: string | null;
  slug: string;
  excerpt: string | null;
  excerpt_zh: string | null;
  body_content: string | null;
  body_content_zh: string | null;
  featured_image_url: string | null;
  is_featured: boolean;
  sort_order: number | null;
}

export interface CmsDetails {
  content_id: string;
  services: string[] | null;
  client_name: string | null;
  project_year: string | number | null;
  short_summary: string | null;
  location: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  role: string | null;
  project_status: string | null;
  year_started: string | number | null;
  year_completed: string | number | null;
  floor_area_value: number | null;
  floor_area_unit: string | null;
  site_area_value: number | null;
  site_area_unit: string | null;
  units_count: number | null;
  storeys_count: number | null;
  scope_of_work: string | null;
  scope_of_work_zh: string | null;
  key_features: string | null;
  key_features_zh: string | null;
  general_contractor: string | null;
  developer_owner_client: string | null;
  design_architect: string | null;
  architect_of_record: string | null;
  interior_designer: string | null;
  structural_engineer: string | null;
  awards: string | null;
  live_url: string | null;
}

export interface CmsMedia {
  id: string;
  content_id: string;
  file_url: string;
  alt_text: string | null;
  caption: string | null;
  is_featured: boolean;
  sort_order: number | null;
}

export interface CmsCategory {
  id: string;
  name: string;
  slug: string;
  sort_order: number | null;
}

export interface CmsTag {
  id: string;
  name: string;
  slug: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  titleZh: string | null;
  excerpt: string | null;
  excerptZh: string | null;
  body: string | null;
  bodyZh: string | null;
  cover: string | null;
  sortOrder: number;
  isFeatured: boolean;
  details: CmsDetails | null;
  categories: CmsCategory[];
  tags: string[];
  images: Array<{ url: string; alt: string; caption: string | null }>;
}

function inList(ids: string[]) {
  return `in.(${ids.join(",")})`;
}

export async function fetchPortfolio(): Promise<{
  projects: PortfolioProject[];
  categories: CmsCategory[];
}> {
  const scope = { client_id: `eq.${OCEANICFLO_CLIENT_ID}` };

  const [items, categories] = await Promise.all([
    cms<CmsItem>("public_content_items", {
      ...scope,
      content_type: "eq.portfolio",
      select:
        "id,title,title_zh,slug,excerpt,excerpt_zh,body_content,body_content_zh,featured_image_url,is_featured,sort_order",
      order: "sort_order.asc",
    }),
    cms<CmsCategory>("public_categories", {
      ...scope,
      category_type: "eq.portfolio",
      select: "id,name,slug,sort_order",
      order: "sort_order.asc,name.asc",
    }),
  ]);

  const ids = items.map((i) => i.id);
  if (ids.length === 0) return { projects: [], categories };

  const [details, media, contentCats, contentTags] = await Promise.all([
    cms<CmsDetails>("public_portfolio_details", { content_id: inList(ids), select: "*" }),
    cms<CmsMedia>("public_media_assets", {
      content_id: inList(ids),
      select: "id,content_id,file_url,alt_text,caption,is_featured,sort_order",
      order: "sort_order.asc",
    }),
    cms<{ content_id: string; category_id: string }>("public_content_categories", {
      content_id: inList(ids),
      select: "content_id,category_id",
    }),
    cms<{ content_id: string; tag_id: string }>("public_content_tags", {
      content_id: inList(ids),
      select: "content_id,tag_id",
    }),
  ]);

  const tagIds = [...new Set(contentTags.map((t) => t.tag_id))];
  const tags = tagIds.length
    ? await cms<CmsTag>("public_tags", { id: inList(tagIds), select: "id,name,slug" })
    : [];

  const catById = new Map(categories.map((c) => [c.id, c]));
  const tagById = new Map(tags.map((t) => [t.id, t]));

  const projects: PortfolioProject[] = items.map((item) => {
    const imgs = media
      .filter((m) => m.content_id === item.id)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((m) => ({ url: m.file_url, alt: m.alt_text || item.title, caption: m.caption }));
    const cover = item.featured_image_url || imgs[0]?.url || null;
    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      titleZh: item.title_zh,
      excerpt: item.excerpt,
      excerptZh: item.excerpt_zh,
      body: item.body_content,
      bodyZh: item.body_content_zh,
      cover,
      sortOrder: item.sort_order ?? 0,
      isFeatured: item.is_featured,
      details: details.find((d) => d.content_id === item.id) ?? null,
      categories: contentCats
        .filter((cc) => cc.content_id === item.id)
        .map((cc) => catById.get(cc.category_id))
        .filter((c): c is CmsCategory => Boolean(c)),
      tags: contentTags
        .filter((ct) => ct.content_id === item.id)
        .map((ct) => tagById.get(ct.tag_id)?.name)
        .filter((n): n is string => Boolean(n)),
      images: imgs.length ? imgs : cover ? [{ url: cover, alt: item.title, caption: null }] : [],
    };
  });

  projects.sort((a, b) => a.sortOrder - b.sortOrder);
  return { projects, categories };
}

export const portfolioQueryOptions = queryOptions({
  queryKey: ["oceanicflo", "portfolio"],
  queryFn: fetchPortfolio,
  staleTime: 5 * 60_000,
});

/** Unified tag list for a project: categories + services + status. */
export function unifiedTags(p: PortfolioProject): string[] {
  const out = [
    ...p.categories.map((c) => c.name),
    ...(p.details?.services ?? []),
    ...p.tags,
  ];
  return [...new Set(out.filter(Boolean))];
}

export function projectTitle(p: PortfolioProject, lang: "en" | "zh") {
  return (lang === "zh" ? p.titleZh : null) || p.title;
}

export function projectSummary(p: PortfolioProject, lang: "en" | "zh") {
  if (lang === "zh") return p.excerptZh || p.details?.short_summary || p.excerpt || "";
  return p.excerpt || p.details?.short_summary || "";
}