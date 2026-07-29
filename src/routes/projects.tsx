import { createFileRoute } from "@tanstack/react-router";
import { ProjectsPage } from "@/components/pages/ProjectsPage";
import { buildHead } from "@/components/site/SEO";
import { IMAGES } from "@/data/content";
export const Route = createFileRoute("/projects")({
  head: () => buildHead({ lang: "en", routeKey: "projects", title: "Selected Work — Oceanicflo Construction", description: "Recent Oceanicflo projects across specialized industrial, commercial, residential, industrial, and institutional categories.", ogImage: IMAGES.og }),
  component: () => <ProjectsPage lang="en" />,
});
