import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ThreePlExpansion } from "@/components/threepl/ThreePlExpansion";
import { ThreePlWhyYuma } from "@/components/threepl/ThreePlWhyYuma";

// Why Yuma, Arizona: the Yuma location and the cross-border operation, linked from Home's map.
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
      <ThreePlExpansion />
    </div>
  );
}
