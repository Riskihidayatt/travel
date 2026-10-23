"use client";

import { AnimatePresence, m, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AppImage } from "@/components/primitives/AppImage";
import { useScrollLock } from "@/components/providers/SmoothScrollProvider";
import type { Photo } from "@/content/types";

/**
 * Lightbox aksesibel: role="dialog", fokus terkunci di dalam, Esc menutup,
 * panah kiri/kanan untuk navigasi, swipe di HP. Di-lazy-load (lihat LazyLightbox).
 */
export default function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: (Photo & { location?: string })[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { lock, unlock } = useScrollLock();
  const photo = photos[index];
  const total = photos.length;

  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + total) % total),
    [index, total, onIndexChange],
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    lock();
    closeRef.current?.focus();
    return () => {
      unlock();
      previouslyFocused?.focus?.();
    };
  }, [lock, unlock]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  if (!photo) return null;

  return createPortal(
    <m.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} dari ${total}: ${photo.alt}`}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 text-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="text-sm font-semibold" aria-live="polite">
          <span className="font-display text-lg">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-cream/80"> / {String(total).padStart(2, "0")}</span>
          {photo.location && <span className="ml-3 text-cream/80">{photo.location}</span>}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup galeri"
          className="grid size-11 place-items-center rounded-full border-2 border-cream/80 transition-transform hover:rotate-90"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 pb-4 sm:px-20">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.div
            key={photo.src}
            className="relative h-full w-full touch-pan-y"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={onDragEnd}
          >
            <AppImage src={photo.src} alt={photo.alt} fill sizes="100vw" quality={85} className="object-contain" draggable={false} />
          </m.div>
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto sebelumnya"
              className="absolute left-3 grid size-12 place-items-center rounded-full border-2 border-ink bg-lime text-ink shadow-sticker transition-transform hover:-translate-x-0.5 max-sm:bottom-6 sm:left-6"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Foto berikutnya"
              className="absolute right-3 grid size-12 place-items-center rounded-full border-2 border-ink bg-lime text-ink shadow-sticker transition-transform hover:translate-x-0.5 max-sm:bottom-6 sm:right-6"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>
      {photo.credit && <p className="pb-4 text-center text-xs text-cream/70">Foto: {photo.credit} (placeholder)</p>}
    </m.div>,
    document.body,
  );
}
