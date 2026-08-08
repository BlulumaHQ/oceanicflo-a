import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProjectsPage } from "@/components/pages/ProjectsPage";
import { buildHead } from "@/components/site/SEO";
import { IMAGES } from "@/data/content";
import { portfolioQueryOptions } from "@/data/cms";

export const Route = createFileRoute("/zh/projects/")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search["category"] === "string" ? (search["category"] as string) : undefined,
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(portfolioQueryOptions);
  },
  head: () =>
    buildHead({
      lang: "zh",
      routeKey: "projects",
      title: "精選專案 — Oceanicflo Construction",
      description: "Oceanicflo 的專案作品集，涵蓋專業工業設施、獨立住宅、室內與商業空間、宗教與休閒設施及施工顧問等專案。",
      ogImage: IMAGES.og,
    }),
  component: ProjectsRoute,
  errorComponent: ({ error }) => <div role="alert" style={{ padding: 48 }}>{error.message}</div>,
  notFoundComponent: () => <div style={{ padding: 48 }}>找不到專案。</div>,
});

function ProjectsRoute() {
  const { category } = Route.useSearch();
  const navigate = useNavigate({ from: "/zh/projects/" });
  return (
    <ProjectsPage
      lang="zh"
      category={category}
      onCategoryChange={(slug) => navigate({ search: { category: slug } })}
    />
  );
}
