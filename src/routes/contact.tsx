import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/ContactPage";
import { buildHead } from "@/components/site/SEO";
import { IMAGES } from "@/data/content";
export const Route = createFileRoute("/contact")({
  head: () => buildHead({ lang: "en", routeKey: "contact", title: "Contact — Oceanicflo Construction", description: "Discuss your project with Oceanicflo Construction. 203-2680 Shell Road, Richmond, BC. 604-818-2088.", ogImage: IMAGES.og }),
  component: () => <ContactPage lang="en" />,
});
