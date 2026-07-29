import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/ContactPage";
import { buildHead } from "@/components/site/SEO";
import { IMAGES } from "@/data/content";
export const Route = createFileRoute("/zh/contact")({
  head: () => buildHead({ lang: "zh", routeKey: "contact", title: "聯絡 — Oceanicflo Construction", description: "與 Oceanicflo Construction 洽談您的專案。203-2680 Shell Road, Richmond, BC. 604-818-2088.", ogImage: IMAGES.og }),
  component: () => <ContactPage lang="zh" />,
});
