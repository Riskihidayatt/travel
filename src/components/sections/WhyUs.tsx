import { AppImage } from "@/components/primitives/AppImage";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TONE_BG } from "@/components/ui/tones";
import type { Feature, SectionCopy } from "@/content/types";
import { cn } from "@/lib/cn";

const SIZE: Record<Feature["size"], string> = {
  hero: "col-span-2 md:row-span-2 min-h-[260px] md:min-h-0",
  wide: "col-span-2",
  tall: "col-span-2 xs:col-span-1 row-span-2 min-h-[300px]",
  base: "col-span-2 xs:col-span-1",
};

/** Bento grid "kenapa trip bareng kami". */
export function WhyUs({ copy, features }: { copy: SectionCopy; features: Feature[] }) {
  return (
    <section id="kenapa" aria-labelledby="why-title" className="py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading copy={copy} id="why-title" tone="tangerine" />
        <RevealGroup as="ul" className="grid grid-flow-dense auto-rows-[minmax(170px,auto)] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {features.map((f) => (
            <RevealItem
              as="li"
              key={f.title}
              className={cn(
                "group relative isolate flex flex-col justify-between overflow-hidden rounded-card border-2 border-ink p-5 shadow-sticker transition-transform duration-300 hover:-translate-y-1 hover:-rotate-[0.6deg] sm:p-6",
                TONE_BG[f.tone],
                SIZE[f.size],
                f.image && "text-cream",
              )}
            >
              {f.image && (
                <>
                  <AppImage
                    src={f.image.src}
                    alt={f.image.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="-z-20 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                </>
              )}
              <span
                className={cn(
                  "grid size-12 place-items-center rounded-2xl border-2 border-ink bg-cream text-ink transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110",
                  f.size === "hero" && "size-16 rounded-3xl",
                )}
              >
                <Icon name={f.icon} className={f.size === "hero" ? "size-8" : "size-6"} strokeWidth={2.25} />
              </span>
              <div className="mt-6 flex flex-col gap-2">
                <h3
                  className={cn(
                    "font-display leading-[1.02] font-extrabold tracking-tight text-balance",
                    f.size === "hero" ? "text-[clamp(1.9rem,5vw,3rem)]" : "text-xl sm:text-2xl",
                  )}
                >
                  {f.title}
                </h3>
                <p className={cn("text-sm sm:text-[15px]", f.image ? "text-cream/90" : "text-ink/80", f.size === "hero" && "max-w-md text-base sm:text-lg")}>
                  {f.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
