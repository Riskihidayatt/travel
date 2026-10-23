"use client";

import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SectionCopy, Step } from "@/content/types";
import { cn } from "@/lib/cn";

const STEP_TONES = ["bg-lime", "bg-sky", "bg-lilac", "bg-tangerine"];

/** Timeline 4 langkah. Garis progres terisi mengikuti scroll (scaleY/scaleX). */
export function HowItWorks({ copy, steps }: { copy: SectionCopy; steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section id="cara-ikut" aria-labelledby="how-title" className="relative overflow-hidden bg-cream-deep py-16 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading copy={copy} id="how-title" tone="lilac" align="center" className="mx-auto" />

        <ol ref={ref} className="relative grid gap-8 md:grid-cols-4 md:gap-6">
          {/* Garis vertikal (mobile) */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.6rem] w-1 rounded-full bg-ink/15 md:hidden" />
          <m.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[1.6rem] w-1 origin-top rounded-full bg-ink md:hidden"
            style={{ scaleY: reduce ? 1 : progress }}
          />
          {/* Garis horizontal (desktop) */}
          <span aria-hidden="true" className="absolute top-8 right-[12%] left-[12%] hidden h-1 rounded-full bg-ink/15 md:block" />
          <m.span
            aria-hidden="true"
            className="absolute top-8 right-[12%] left-[12%] hidden h-1 origin-left rounded-full bg-ink md:block"
            style={{ scaleX: reduce ? 1 : progress }}
          />

          {steps.map((step, i) => (
            <m.li
              key={step.title}
              className="relative flex gap-5 md:flex-col md:items-center md:text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.2, 0.9, 0.25, 1] }}
            >
              <span
                className={cn(
                  "relative z-[1] grid size-[3.4rem] shrink-0 place-items-center rounded-2xl border-2 border-ink text-ink shadow-sticker md:size-16",
                  STEP_TONES[i % STEP_TONES.length],
                  i % 2 === 0 ? "-rotate-6" : "rotate-6",
                )}
              >
                <Icon name={step.icon} className="size-6 md:size-7" strokeWidth={2.25} />
                <span className="absolute -top-2.5 -right-2.5 grid size-7 place-items-center rounded-full border-2 border-ink bg-cream font-display text-xs font-extrabold">
                  {i + 1}
                </span>
              </span>
              <div className="flex flex-col gap-1.5 pt-1 md:pt-3">
                <h3 className="font-display text-2xl leading-tight font-extrabold tracking-tight">{step.title}</h3>
                <p className="max-w-xs text-[15px] text-muted md:mx-auto">{step.description}</p>
              </div>
            </m.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
