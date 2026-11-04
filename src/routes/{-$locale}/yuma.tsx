import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ThreePlExpansion } from "@/components/threepl/ThreePlExpansion";
import { ThreePlMap } from "@/components/threepl/ThreePlHero";
import { ThreePlWhyYuma } from "@/components/threepl/ThreePlWhyYuma";

// Why Yuma, Arizona (with photos), the border map, and the cross-border operation; linked from
// Home's map section.
export const Route = createFileRoute("/{-$locale}/yuma")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.yuma;
    return pageHead({ locale, path: "/yuma", ...meta });
  },
  component: Page,
});

function Page() {
  return (
    <div className="accent-terracotta">
      <ThreePlWhyYuma page />
      <ThreePlMap onYumaPage />
      <ThreePlExpansion />
    </div>
  );
}
