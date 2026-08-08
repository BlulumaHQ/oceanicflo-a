import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages/HomePage";
import { buildHead, LOCAL_BUSINESS_LD } from "@/components/site/SEO";
import { IMAGES } from "@/data/content";
import { portfolioQueryOptions } from "@/data/cms";

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(portfolioQueryOptions);
  },
  head: () => buildHead({
    lang: "en", routeKey: "home",
    title: "Oceanicflo Construction — Richmond, BC | Integrated Project Delivery",
    description: "Richmond-based construction company delivering integrated project delivery, design + build, general contracting, construction management, and project management across specialized industrial, commercial, residential, industrial, and institutional projects.",
    ogImage: IMAGES.og,
    structuredData: LOCAL_BUSINESS_LD,
  }),
  component: () => <HomePage lang="en" />,
});
