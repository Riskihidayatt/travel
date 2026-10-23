"use client";

import { m } from "motion/react";
import { Expand } from "lucide-react";
import { useState } from "react";
import { AppImage } from "@/components/primitives/AppImage";
import { LazyLightbox } from "@/components/ui/LazyLightbox";
import type { GalleryPhoto } from "@/content/types";
import { cn } from "@/lib/cn";

const ASPECT: Record<GalleryPhoto["aspect"], string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

/** Masonry (CSS columns) + lightbox. Di-lazy-load oleh `Gallery`. */
export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {photos.map((photo, i) => (
          <m.li
            key={`${photo.src}-${i}`}
            className="mb-3 break-inside-avoid sm:mb-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.2, 0.9, 0.25, 1] }}
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Lihat foto: ${photo.alt}`}
              className={cn(
                "group relative block w-full overflow-hidden rounded-3xl border-2 border-ink bg-cream-deep",
                ASPECT[photo.aspect],
              )}
            >
              <AppImage
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 text-left text-xs font-bold text-cream sm:text-sm">{photo.location}</span>
              <span aria-hidden="true" className="absolute top-3 right-3 grid size-9 scale-75 place-items-center rounded-full border-2 border-ink bg-lime opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                <Expand className="size-4" strokeWidth={2.5} />
              </span>
            </button>
          </m.li>
        ))}
      </ul>
      <LazyLightbox photos={photos} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </>
  );
}
