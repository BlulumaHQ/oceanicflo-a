import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages/HomePage";
import { buildHead, LOCAL_BUSINESS_LD } from "@/components/site/SEO";
import { IMAGES } from "@/data/content";
import { portfolioQueryOptions } from "@/data/cms";
export const Route = createFileRoute("/zh/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(portfolioQueryOptions);
  },
  head: () => buildHead({ lang: "zh", routeKey: "home", title: "Oceanicflo Construction — 卑詩省列治文 | 整合式專案交付", description: "Oceanicflo 是一家位於列治文的建築公司，提供整合式專案交付、設計與施工整合、總承包、施工管理及專案管理服務。", ogImage: IMAGES.og, structuredData: LOCAL_BUSINESS_LD }),
  component: () => <HomePage lang="zh" />,
});
