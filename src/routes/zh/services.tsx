import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { buildHead } from "@/components/site/SEO";
import { IMAGES } from "@/data/content";
export const Route = createFileRoute("/zh/services")({
  head: () => buildHead({ lang: "zh", routeKey: "services", title: "服務 — Oceanicflo Construction", description: "五種交付架構：整合式專案交付、設計與施工整合、總承包、施工管理及專案管理。", ogImage: IMAGES.og }),
  component: () => <ServicesPage lang="zh" />,
});
