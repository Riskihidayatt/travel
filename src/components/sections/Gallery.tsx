"use client";

import { useInView } from "motion/react";
import { lazy, Suspense, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { GalleryPhoto, SectionCopy } from "@/content/types";

/** Grid galeri baru diunduh saat section mendekati viewport. */
const GalleryGrid = lazy(() => import("./GalleryGrid"));

function Skeleton({ count }: { count: number }) {
  return (
    <div aria-hidden="true" className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`mb-3 break-inside-avoid rounded-3xl border-2 border-ink/20 bg-cream-deep sm:mb-4 ${i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-[4/3]" : "aspect-square"}`} />
      ))}
    </div>
  );
}

export function Gallery({ copy, photos }: { copy: SectionCopy; photos: GalleryPhoto[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: "800px 0px 800px 0px" });

  return (
    <section id="galeri" aria-labelledby="gallery-title" className="py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading copy={copy} id="gallery-title" tone="tangerine" />
        <div ref={ref}>
          {near ? (
            <Suspense fallback={<Skeleton count={photos.length} />}>
              <GalleryGrid photos={photos} />
            </Suspense>
          ) : (
            <Skeleton count={photos.length} />
          )}
        </div>
      </Container>
    </section>
  );
}
