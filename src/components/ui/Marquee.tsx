import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Marquee CSS murni (transform). Isi diduplikasi agar loop mulus.
 * Berhenti saat hover/fokus, dan diam total saat prefers-reduced-motion.
 */
export function Marquee({
  children,
  reverse = false,
  duration = 40,
  className,
  trackClassName,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
  trackClassName?: string;
}) {
  return (
    <div className={cn("marquee-group flex overflow-hidden", className)}>
      <div
        className={cn(
          "marquee-track flex w-max shrink-0",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          trackClassName,
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
