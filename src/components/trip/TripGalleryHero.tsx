"use client";

import { Images } from "lucide-react";
import { useState } from "react";
import { AppImage } from "@/components/primitives/AppImage";
import { LazyLightbox } from "@/components/ui/LazyLightbox";
import type { Photo } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Galeri hero detail trip.
 * Mobile: geser horizontal (scroll-snap). Desktop: mosaic 1 besar + maks 4 kecil.
 */
export function TripGalleryHero({ photos, title }: { photos: Photo[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const shown = photos.slice(0, 5);
  const isSingle = shown.length === 1;

  return (
    <div className="relative">
      {/* Mobile */}
      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:hidden" aria-label={`Foto ${title}`}>
        {photos.map((photo, i) => (
          <li key={`${photo.src}-${i}`} className={cn("shrink-0 snap-center", photos.length === 1 ? "w-full" : "w-[86%]")}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Perbesar foto ${i + 1}: ${photo.alt}`}
              className="relative block aspect-[4/3.2] w-full overflow-hidden rounded-3xl border-2 border-ink"
            >
              <AppImage src={photo.src} alt={photo.alt} fill priority={i === 0} sizes="90vw" className="object-cover" />
              <span className="absolute right-3 bottom-3 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-bold text-cream">
                {i + 1}/{photos.length}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Desktop */}
      <div
        className={cn(
          "hidden gap-3 md:grid",
          isSingle ? "grid-cols-1" : shown.length <= 3 ? "grid-cols-3 grid-rows-2" : "grid-cols-4 grid-rows-2",
          "h-[min(62vh,560px)]",
        )}
      >
        {shown.map((photo, i) => (
          <button
            key={`${photo.src}-${i}`}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Perbesar foto ${i + 1}: ${photo.alt}`}
            className={cn(
              "group relative overflow-hidden rounded-3xl border-2 border-ink",
              i === 0 && !isSingle && "col-span-2 row-span-2",
              shown.length === 2 && i === 1 && "row-span-2",
              shown.length === 4 && i === 3 && "col-span-2",
            )}
          >
            <AppImage
              src={photo.src}
              alt={photo.alt}
              fill
              priority={i === 0}
              sizes={i === 0 ? "(min-width: 1280px) 50vw, 60vw" : "25vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {photos.length > 1 && (
        <button
          type="button"
          onClick={() => setIndex(0)}
          className="absolute right-4 bottom-4 hidden items-center gap-2 rounded-full border-2 border-ink bg-cream px-4 py-2 text-sm font-bold shadow-sticker transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          <Images aria-hidden="true" className="size-4" />
          Lihat {photos.length} foto
        </button>
      )}

      <LazyLightbox photos={photos} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </div>
  );
}
