import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProjectsPage } from "@/components/pages/ProjectsPage";
import { buildHead } from "@/components/site/SEO";
import { IMAGES } from "@/data/content";
import { portfolioQueryOptions } from "@/data/cms";

export const Route = createFileRoute("/projects/")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search["category"] === "string" ? (search["category"] as string) : undefined,
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(portfolioQueryOptions);
  },
  head: () =>
    buildHead({
      lang: "en",
      routeKey: "projects",
      title: "Selected Work — Oceanicflo Construction",
      description:
        "Oceanicflo project portfolio across specialized industrial, single family, interior + retail, religious + recreation, and construction consultation work.",
      ogImage: IMAGES.og,
    }),
  component: ProjectsRoute,
  errorComponent: ({ error }) => <div role="alert" style={{ padding: 48 }}>{error.message}</div>,
  notFoundComponent: () => <div style={{ padding: 48 }}>No projects found.</div>,
});

function ProjectsRoute() {
  const { category } = Route.useSearch();
  const navigate = useNavigate({ from: "/projects/" });
  return (
    <ProjectsPage
      lang="en"
      category={category}
      onCategoryChange={(slug) => navigate({ search: { category: slug } })}
    />
  );
}
