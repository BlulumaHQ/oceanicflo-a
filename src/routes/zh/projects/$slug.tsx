import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetailPage } from "@/components/pages/ProjectDetailPage";
import { buildHead } from "@/components/site/SEO";
import { portfolioQueryOptions } from "@/data/cms";

export const Route = createFileRoute("/zh/projects/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(portfolioQueryOptions);
    const project = data.projects.find((p) => p.slug === params.slug) ?? null;
    return {
      title: project?.titleZh ?? project?.title ?? "專案",
      description: project?.excerptZh ?? project?.excerpt ?? project?.details?.short_summary ?? "Oceanicflo 專案。",
      cover: project?.cover ?? null,
    };
  },
  head: ({ loaderData, params }) =>
    buildHead({
      lang: "zh",
      routeKey: "projects",
      altPair: { en: `/projects/${params.slug}`, zh: `/zh/projects/${params.slug}` },
      title: `${loaderData?.title ?? "專案"} — Oceanicflo Construction`,
      description: (loaderData?.description ?? "").slice(0, 158),
      ogImage: loaderData?.cover ?? undefined,
    }),
  component: DetailRoute,
  errorComponent: ({ error }) => <div role="alert" style={{ padding: 48 }}>{error.message}</div>,
  notFoundComponent: () => <div style={{ padding: 48 }}>找不到專案。</div>,
});

function DetailRoute() {
  const { slug } = Route.useParams();
  return <ProjectDetailPage lang="zh" slug={slug} />;
}
