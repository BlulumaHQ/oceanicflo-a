import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { buildHead } from "@/components/site/SEO";
import { IMAGES } from "@/data/content";
export const Route = createFileRoute("/services")({
  head: () => buildHead({ lang: "en", routeKey: "services", title: "Services — Oceanicflo Construction", description: "Five delivery structures: integrated project delivery, design + build, general contracting, construction management, and project management.", ogImage: IMAGES.og }),
  component: () => <ServicesPage lang="en" />,
});
