"use client";

import { m } from "motion/react";
import { Users } from "lucide-react";
import type { Availability } from "@/lib/availability";
import { cn } from "@/lib/cn";

const FILL: Record<Availability["status"], string> = {
  open: "bg-lime",
  "almost-full": "bg-tangerine",
  full: "bg-ink",
  finished: "bg-muted",
};

/** Progress bar kuota + teks "sisa X seat". Bar diisi dengan scaleX (transform). */
export function QuotaBar({ availability, total, className }: { availability: Availability; total: number; className?: string }) {
  const { status, seatsLeft, filledRatio } = availability;
  const text =
    status === "finished"
      ? "Trip sudah berangkat"
      : status === "full"
        ? "Seat habis, buka waiting list"
        : `Sisa ${seatsLeft} seat`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className={cn("inline-flex items-center gap-1.5", status === "almost-full" && "text-tangerine-deep")}>
          <Users aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
          {text}
        </span>
        <span className="text-muted">
          {total - seatsLeft}/{total}
        </span>
      </div>
      <div aria-hidden="true" className="h-2.5 overflow-hidden rounded-full border-2 border-ink bg-cream">
        <m.span
          className={cn("block h-full origin-left rounded-full", FILL[status])}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: filledRatio }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.2, 0.9, 0.25, 1], delay: 0.15 }}
        />
      </div>
    </div>
  );
}
