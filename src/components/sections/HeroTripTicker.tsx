"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { AppLink } from "@/components/primitives/AppLink";
import { cn } from "@/lib/cn";

export interface TripChip {
  slug: string;
  title: string;
  destination: string;
  dateLabel: string;
  seatsLeft: number;
}

/**
 * Chip melayang "Next trip" yang bergilir melewati beberapa jadwal terdekat
 * (bukan satu destinasi saja). Berhenti saat hover/fokus; statis bila reduced motion.
 */
export function HeroTripTicker({ trips, interval = 3800 }: { trips: TripChip[]; interval?: number }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || trips.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % trips.length), interval);
    return () => window.clearInterval(id);
  }, [reduce, paused, trips.length, interval]);

  const trip = trips[index];
  if (!trip) return null;

  return (
    <div
      className="w-full max-w-sm animate-float lg:w-[22rem]"
      style={{ ["--float-rotate" as string]: "-2deg" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="rounded-3xl border-2 border-ink bg-cream p-4 text-ink shadow-pop">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold tracking-wider text-lime uppercase">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-lime" />
              <span className="relative size-1.5 rounded-full bg-lime" />
            </span>
            {index === 0 ? "Next trip" : "Jadwal terdekat"}
          </span>
          {trips.length > 1 && (
            <span className="flex gap-1" aria-hidden="true">
              {trips.map((t, i) => (
                <span key={t.slug} className={cn("size-1.5 rounded-full", i === index ? "bg-ink" : "bg-ink/20")} />
              ))}
            </span>
          )}
        </div>

        <div className="relative mt-3 grid overflow-hidden" aria-live="off">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.div
              key={trip.slug}
              className="col-start-1 row-start-1"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0.9, 0.25, 1] }}
            >
              <AppLink href={`/trips/${trip.slug}`} className="group flex items-end justify-between gap-3 rounded-xl">
                <span className="min-w-0">
                  <span className="flex items-center gap-1 text-xs font-semibold text-muted">
                    <MapPin aria-hidden="true" className="size-3.5" />
                    {trip.destination}
                  </span>
                  <span className="mt-0.5 block truncate font-display text-xl leading-tight font-extrabold group-hover:underline">
                    {trip.title}
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-muted">
                    <CalendarDays aria-hidden="true" className="size-4" />
                    {trip.dateLabel} · <strong className="font-bold text-tangerine-deep">sisa {trip.seatsLeft} seat</strong>
                  </span>
                </span>
                <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-lime transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" strokeWidth={2.75} />
                </span>
              </AppLink>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
