import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetailPage } from "@/components/pages/ProjectDetailPage";
import { buildHead } from "@/components/site/SEO";
import { portfolioQueryOptions } from "@/data/cms";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(portfolioQueryOptions);
    const project = data.projects.find((p) => p.slug === params.slug) ?? null;
    return {
      title: project?.title ?? "Project",
      description: project?.excerpt ?? project?.details?.short_summary ?? "Oceanicflo Construction project.",
      cover: project?.cover ?? null,
    };
  },
  head: ({ loaderData, params }) =>
    buildHead({
      lang: "en",
      routeKey: "projects",
      altPair: { en: `/projects/${params.slug}`, zh: `/zh/projects/${params.slug}` },
      title: `${loaderData?.title ?? "Project"} — Oceanicflo Construction`,
      description: (loaderData?.description ?? "").slice(0, 158),
      ogImage: loaderData?.cover ?? undefined,
    }),
  component: DetailRoute,
  errorComponent: ({ error }) => <div role="alert" style={{ padding: 48 }}>{error.message}</div>,
  notFoundComponent: () => <div style={{ padding: 48 }}>Project not found.</div>,
});

function DetailRoute() {
  const { slug } = Route.useParams();
  return <ProjectDetailPage lang="en" slug={slug} />;
}
