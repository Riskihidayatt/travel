import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Marquee } from "@/components/ui/Marquee";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SectionCopy, Stat } from "@/content/types";
import { cn } from "@/lib/cn";

const ACCENT = ["text-lime", "text-tangerine", "text-lilac", "text-sky"];

export function Stats({ copy, stats, brandName }: { copy: SectionCopy; stats: Stat[]; brandName: string }) {
  return (
    <section aria-labelledby="stats-title" className="relative overflow-hidden bg-ink py-16 text-cream sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.06]">
        <Marquee duration={60}>
          <span
            data-text={`${brandName} trip`}
            className="pr-10 font-display text-[22vw] leading-none font-extrabold whitespace-nowrap before:content-[attr(data-text)]"
          />
        </Marquee>
      </div>
      <Container className="relative flex flex-col gap-12">
        <SectionHeading copy={copy} id="stats-title" invert tone="lime" />
        <RevealGroup as="dl" className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <RevealItem key={s.label} className="flex flex-col gap-2 border-t-2 border-cream/25 pt-5">
              <dt className="order-2 flex items-center gap-1.5 text-base font-bold sm:text-lg">
                {s.label}
                {s.label.toLowerCase() === "rating" && <Star aria-hidden="true" className="size-4 fill-lime text-lime" />}
              </dt>
              <dd className="order-1 m-0">
                <CountUp
                  value={s.value}
                  decimals={s.decimals}
                  suffix={s.suffix}
                  className={cn("block font-display text-[clamp(2.1rem,10vw,3.5rem)] lg:text-[clamp(3rem,4.6vw,4.25rem)] leading-none font-extrabold tracking-[-0.04em] tabular-nums", ACCENT[i % ACCENT.length])}
                />
              </dd>
              <dd className="order-3 m-0 text-sm text-cream/75">{s.caption}</dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
