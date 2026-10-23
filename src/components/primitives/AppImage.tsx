"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Pembungkus gambar. Seluruh komponen WAJIB memakai ini (bukan next/image langsung)
 * supaya saat migrasi ke Laravel + Inertia cukup file ini yang diganti
 * (mis. jadi <img loading="lazy"> atau komponen image CDN).
 *
 * Bonus: kalau gambar gagal dimuat, tampil fallback bergradasi (bukan ikon rusak).
 */
const FALLBACK_STYLE = {
  background:
    "radial-gradient(circle at 30% 20%, var(--color-lime), transparent 55%), radial-gradient(circle at 80% 75%, var(--color-tangerine), transparent 55%), var(--color-lilac)",
};

export type AppImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

export function AppImage({ className, fill, alt, onError, ...props }: AppImageProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Gambar yang gagal SEBELUM React hydrate tidak memicu onError → cek manual.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={cn("block", fill && "absolute inset-0 h-full w-full", className)}
        style={FALLBACK_STYLE}
      />
    );
  }

  return (
    <Image
      {...props}
      ref={imgRef}
      alt={alt}
      fill={fill}
      className={className}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
    />
  );
}
