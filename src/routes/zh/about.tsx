import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/pages/AboutPage";
import { buildHead } from "@/components/site/SEO";
import { IMAGES } from "@/data/content";
export const Route = createFileRoute("/zh/about")({
  head: () => buildHead({ lang: "zh", routeKey: "about", title: "關於 — Oceanicflo Construction", description: "Oceanicflo Construction 位於卑詩省列治文，讓業主、顧問、承包商及營運人員在同一合作架構下協同工作。", ogImage: IMAGES.og }),
  component: () => <AboutPage lang="zh" />,
});
