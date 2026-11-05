import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

/**
 * 3PL page section header: the section name is the title ("Logistics services"), the old
 * headline is its subtitle ("A scope configured for your project."), then an optional lead.
 */
export function SectionHeader({
  id,
  title,
  subtitle,
  body,
  as = "h2",
  className,
}: {
  id: string;
  title: string;
  subtitle: string;
  body?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal
        as={as}
        className={cn(
          "heading",
          as === "h1" ? "text-[clamp(2.25rem,4.2vw,3.5rem)]" : "text-[clamp(1.75rem,3vw,2.5rem)]",
        )}
      >
        <span id={id}>{title}</span>
      </Reveal>
      <Reveal delay={80}>
        <p className="mt-4 text-balance text-xl font-semibold text-accent-deep md:text-2xl">
          {subtitle}
        </p>
      </Reveal>
      {body && (
        <Reveal delay={140}>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-paper-muted md:text-lg">
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
