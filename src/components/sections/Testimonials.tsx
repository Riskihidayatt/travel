"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, BadgeCheck, Heart, Send, Star } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TONE_BG } from "@/components/ui/tones";
import type { SectionCopy, Testimonial } from "@/content/types";
import { cn } from "@/lib/cn";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function StoryCard({ t, brandName, active }: { t: Testimonial; brandName: string; active: boolean }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-4 rounded-[2rem] border-2 border-ink bg-cream p-4 shadow-sticker transition-transform duration-500 sm:p-5",
        active ? "md:-rotate-1" : "md:rotate-1",
      )}
    >
      <div aria-hidden="true" className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className={cn("h-1 flex-1 rounded-full", i === 0 ? "bg-ink" : "bg-ink/20")} />
        ))}
      </div>
      <header className="flex items-center gap-3">
        <span className={cn("grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink font-display font-extrabold", TONE_BG[t.tone])}>
          {initials(t.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 truncate font-bold">
            {t.name}
            <BadgeCheck aria-label="Peserta terverifikasi" className="size-4 shrink-0 fill-sky text-ink" />
          </p>
          <p className="truncate text-xs text-muted">
            {t.handle} · {t.city}
          </p>
        </div>
        <span role="img" className="flex shrink-0 items-center gap-0.5" aria-label={`Rating ${t.rating} dari 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} aria-hidden="true" className={cn("size-3.5", i < t.rating ? "fill-tangerine text-ink" : "text-ink/25")} />
          ))}
        </span>
      </header>

      <p className="w-fit rounded-full border-2 border-ink bg-lime px-2.5 py-0.5 text-xs font-bold">Trip: {t.tripTitle}</p>

      <div className="flex flex-1 flex-col gap-2">
        {t.messages.map((msg, i) => (
          <p key={i} className="max-w-[88%] rounded-[1.25rem] rounded-bl-md border-2 border-ink bg-cream-deep px-3.5 py-2.5 text-[15px] leading-snug">
            {msg}
          </p>
        ))}
        {t.reply && (
          <p className="mt-1 max-w-[85%] self-end rounded-[1.25rem] rounded-br-md bg-ink px-3.5 py-2.5 text-[15px] leading-snug text-cream">
            <span className="mb-0.5 block text-[11px] font-bold tracking-wide text-lime uppercase">{brandName} admin</span>
            {t.reply}
          </p>
        )}
      </div>

      <div aria-hidden="true" className="flex items-center gap-2">
        <span className="flex h-10 flex-1 items-center rounded-full border-2 border-ink/25 px-4 text-sm text-muted">Balas ke {t.name.split(" ")[0]}...</span>
        <Heart className="size-5" />
        <Send className="size-5" />
      </div>
    </article>
  );
}

/** Carousel testimoni bergaya story / DM. Bisa dioperasikan keyboard. */
export function Testimonials({ copy, testimonials, brandName }: { copy: SectionCopy; testimonials: Testimonial[]; brandName: string }) {
  const reduce = useReducedMotion();
  const plugins = useMemo(
    () => (reduce ? [] : [Autoplay({ delay: 4800, stopOnInteraction: true, stopOnMouseEnter: true, stopOnFocusIn: true })]),
    [reduce],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true, duration: 30 }, plugins);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <section aria-labelledby="testi-title" className="overflow-hidden py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading copy={copy} id="testi-title" tone="lilac" />
          <div className="flex gap-3">
            <button type="button" onClick={prev} aria-label="Testimoni sebelumnya" className="grid size-12 place-items-center rounded-full border-2 border-ink bg-cream shadow-sticker transition-transform hover:-translate-x-0.5 active:scale-90">
              <ArrowLeft className="size-5" strokeWidth={2.5} />
            </button>
            <button type="button" onClick={next} aria-label="Testimoni berikutnya" className="grid size-12 place-items-center rounded-full border-2 border-ink bg-lime shadow-sticker transition-transform hover:translate-x-0.5 active:scale-90">
              <ArrowRight className="size-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimoni peserta"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="-mx-4 rounded-[2rem] px-4 sm:mx-0 sm:px-0"
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="-ml-4 flex touch-pan-y py-3 pr-2">
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} dari ${testimonials.length}`}
                  className="min-w-0 shrink-0 grow-0 basis-[86%] pl-4 xs:basis-[75%] sm:basis-1/2 lg:basis-1/3"
                >
                  <StoryCard t={t} brandName={brandName} active={i === selected} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2" role="group" aria-label="Pilih testimoni">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Testimoni ${i + 1}`}
              aria-current={i === selected}
              className="grid h-6 w-6 place-items-center"
            >
              <span className={cn("block h-2.5 rounded-full border-2 border-ink transition-transform duration-300", i === selected ? "w-6 bg-ink" : "w-2.5 bg-cream")} />
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
