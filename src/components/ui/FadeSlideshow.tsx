"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AppImage } from "@/components/primitives/AppImage";
import type { Photo } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Slideshow foto dengan crossfade (opacity + zoom pelan, transform saja).
 * - Hanya berjalan saat terlihat di layar (hemat CPU/baterai).
 * - Foto berikutnya baru dimuat menjelang tampil.
 * - Reduced motion → foto pertama saja, diam.
 */
export function FadeSlideshow({
  photos,
  sizes,
  interval = 3500,
  className,
  showDots = true,
}: {
  photos: Photo[];
  sizes: string;
  interval?: number;
  className?: string;
  showDots?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  // Dua foto pertama langsung disiapkan agar crossfade pertama mulus; sisanya bertahap.
  const [mounted, setMounted] = useState(Math.min(2, photos.length));
  const total = photos.length;

  useEffect(() => {
    if (!inView || reduce || total < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % total;
        setMounted((n) => Math.min(total, Math.max(n, next + 2)));
        return next;
      });
    }, interval);
    return () => window.clearInterval(id);
  }, [inView, reduce, total, interval]);

  return (
    <div ref={ref} className={cn("absolute inset-0", className)}>
      {photos.slice(0, mounted).map((photo, i) => (
        <div
          key={photo.src}
          aria-hidden={i !== active}
          className={cn("absolute inset-0 transition-opacity duration-1000 ease-out", i === active ? "opacity-100" : "opacity-0")}
        >
          <AppImage
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            className={cn(
              "object-cover transition-transform duration-[4500ms] ease-out",
              i === active && !reduce ? "scale-110" : "scale-100",
            )}
          />
        </div>
      ))}
      {showDots && total > 1 && !reduce && (
        <div aria-hidden="true" className="absolute top-5 right-5 z-10 flex gap-1.5 sm:top-6 sm:right-6">
          {photos.map((p, i) => (
            <span key={p.src} className={cn("h-1.5 rounded-full bg-cream transition-opacity", i === active ? "w-4 opacity-100" : "w-1.5 opacity-50")} />
          ))}
        </div>
      )}
    </div>
  );
}
