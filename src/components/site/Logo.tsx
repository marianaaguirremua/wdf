import { LOGO_ON_DARK, LOGO_ON_LIGHT, LOGO_SIZE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Official WDF logo (unaltered SVGs in public/brand). Pick the variant by background. */
export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <img
      src={tone === "dark" ? LOGO_ON_DARK : LOGO_ON_LIGHT}
      alt="WDF"
      width={LOGO_SIZE.width}
      height={LOGO_SIZE.height}
      decoding="async"
      className={cn("h-auto w-24 object-contain", className)}
    />
  );
}
