"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { formatNumber } from "@/lib/format";

/**
 * Counter beranimasi. SSR menampilkan angka final (bagus untuk SEO & no-JS),
 * lalu di-reset ke 0 dan dianimasikan saat masuk viewport. Update teks via ref,
 * bukan state, supaya tidak re-render tiap frame.
 */
export function CountUp({ value, decimals = 0, suffix = "", className }: { value: number; decimals?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const prepared = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prepared.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    prepared.current = true;
    el.textContent = `${formatNumber(0, decimals)}${suffix}`;
  }, [decimals, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || !prepared.current) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        el.textContent = `${formatNumber(latest, decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, suffix]);

  return (
    <span ref={ref} className={className}>
      {formatNumber(value, decimals)}
      {suffix}
    </span>
  );
}
