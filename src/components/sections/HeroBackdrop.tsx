"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppImage } from "@/components/primitives/AppImage";
import { Container } from "@/components/ui/Container";
import type { HeroContent } from "@/content/types";
import { cn } from "@/lib/cn";

const SLIDE_MS = 5500;

/**
 * Background hero: slideshow multi-destinasi (crossfade opacity + zoom pelan),
 * parallax ringan saat scroll. Slide berikutnya baru dimuat menjelang tampil
 * supaya hemat kuota di HP. Reduced motion → foto pertama saja, tanpa parallax.
 * Video opsional hanya di layar >= 768px.
 */
export function HeroBackdrop({ slides, video }: { slides: HeroContent["slides"]; video?: HeroContent["backgroundVideo"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(1);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (reduce || slides.length < 2 || playVideo) return;
    // muat slide kedua lebih awal, sisanya bertahap
    const preload = window.setTimeout(() => setMounted((n) => Math.max(n, 2)), 1500);
    const id = window.setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % slides.length;
        setMounted((n) => Math.min(slides.length, Math.max(n, next + 2)));
        return next;
      });
    }, SLIDE_MS);
    return () => {
      window.clearTimeout(preload);
      window.clearInterval(id);
    };
  }, [reduce, slides.length, playVideo]);

  useEffect(() => {
    if (!video) return;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- keputusan hanya bisa dibuat di browser
    if (desktop && !reduced) setPlayVideo(true);
  }, [video]);

  const current = slides[active];

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <m.div className="absolute inset-x-0 -top-[4%] -bottom-[14%] will-change-transform" style={reduce ? undefined : { y }}>
        {slides.slice(0, mounted).map((slide, i) => (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1400ms] ease-out",
              i === active ? "opacity-100" : "opacity-0",
            )}
          >
            <AppImage
              src={slide.src}
              fallbackSrc={slide.fallbackSrc}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              quality={75}
              className={cn(
                "object-cover transition-transform duration-[7000ms] ease-out",
                i === active && !reduce ? "scale-110" : "scale-100",
              )}
            />
          </div>
        ))}
        {playVideo && video && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
      </m.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

      {!playVideo && current && (
        <Container className="absolute inset-x-0 top-28 hidden sm:block">
          <div className="flex items-center gap-3">
            <span key={current.location} className="fade-up inline-flex items-center gap-1.5 rounded-full bg-ink/50 px-3 py-1.5 text-xs font-semibold text-cream backdrop-blur-md">
              <MapPin className="size-3.5 text-lime" strokeWidth={2.5} />
              {current.location}
            </span>
            {slides.length > 1 && !reduce && (
              <span className="hidden gap-1.5 sm:flex">
                {slides.map((s, i) => (
                  <span key={s.src} className="relative h-1 w-6 overflow-hidden rounded-full bg-cream/30">
                    <span
                      className={cn(
                        "absolute inset-0 origin-left rounded-full bg-lime",
                        i === active ? "animate-[hero-progress_5.5s_linear_forwards]" : i < active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </span>
                ))}
              </span>
            )}
          </div>
        </Container>
      )}
    </div>
  );
}
