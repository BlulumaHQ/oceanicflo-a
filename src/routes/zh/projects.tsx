import { createFileRoute } from "@tanstack/react-router";
import { ProjectsPage } from "@/components/pages/ProjectsPage";
import { buildHead } from "@/components/site/SEO";
import { IMAGES } from "@/data/content";
export const Route = createFileRoute("/zh/projects")({
  head: () => buildHead({ lang: "zh", routeKey: "projects", title: "精選專案 — Oceanicflo Construction", description: "Oceanicflo 近期跨工業、商業、住宅、機構等領域的施工作品。", ogImage: IMAGES.og }),
  component: () => <ProjectsPage lang="zh" />,
});
