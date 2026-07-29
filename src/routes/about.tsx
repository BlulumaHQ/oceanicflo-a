import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/pages/AboutPage";
import { buildHead } from "@/components/site/SEO";
import { IMAGES } from "@/data/content";
export const Route = createFileRoute("/about")({
  head: () => buildHead({ lang: "en", routeKey: "about", title: "About — Oceanicflo Construction", description: "Oceanicflo Construction, based in Richmond, British Columbia — organizing owners, consultants, contractors, and operators inside one coordinated working structure.", ogImage: IMAGES.og }),
  component: () => <AboutPage lang="en" />,
});
