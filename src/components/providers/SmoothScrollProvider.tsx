"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";

interface SmoothScrollApi {
  /** Kunci scroll (mis. saat menu mobile / lightbox terbuka). */
  lock: () => void;
  unlock: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi>({ lock: () => {}, unlock: () => {} });

export function useScrollLock(): SmoothScrollApi {
  return useContext(SmoothScrollContext);
}

/**
 * Smooth scroll dengan Lenis. Otomatis NONAKTIF bila user memilih
 * `prefers-reduced-motion: reduce` atau memakai perangkat sentuh
 * (scroll native HP sudah mulus & lebih hemat baterai).
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const lockCount = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      anchors: { offset: -88 },
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const lock = useCallback(() => {
    lockCount.current += 1;
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
  }, []);

  const unlock = useCallback(() => {
    lockCount.current = Math.max(0, lockCount.current - 1);
    if (lockCount.current > 0) return;
    lenisRef.current?.start();
    document.documentElement.style.overflow = "";
  }, []);

  const api = useMemo(() => ({ lock, unlock }), [lock, unlock]);

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}
