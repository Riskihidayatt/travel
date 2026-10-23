"use client";

import { AnimatePresence } from "motion/react";
import { lazy, Suspense } from "react";
import type { Photo } from "@/content/types";

/** Kode lightbox baru diunduh saat pertama kali dibuka (React.lazy, bukan API Next). */
const Lightbox = lazy(() => import("./Lightbox"));

export function LazyLightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: (Photo & { location?: string })[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  return (
    <Suspense fallback={null}>
      <AnimatePresence>
        {index !== null && (
          <Lightbox key="lightbox" photos={photos} index={index} onClose={onClose} onIndexChange={onIndexChange} />
        )}
      </AnimatePresence>
    </Suspense>
  );
}
