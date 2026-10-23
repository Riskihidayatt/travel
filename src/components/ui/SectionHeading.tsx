import type { SectionCopy } from "@/content/types";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function SectionHeading({
  copy,
  align = "left",
  tone = "lime",
  invert = false,
  className,
  id,
}: {
  copy: SectionCopy;
  align?: "left" | "center";
  tone?: "lime" | "tangerine" | "lilac" | "cream";
  invert?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <Reveal className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      <Eyebrow tone={tone}>{copy.eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(
          "max-w-3xl font-display text-[clamp(2.1rem,7.5vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-balance",
          invert ? "text-cream" : "text-ink",
        )}
      >
        {copy.title}
      </h2>
      {copy.description && (
        <p className={cn("max-w-xl text-base sm:text-lg text-pretty", invert ? "text-cream/80" : "text-muted")}>
          {copy.description}
        </p>
      )}
    </Reveal>
  );
}
