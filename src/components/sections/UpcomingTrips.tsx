"use client";

import { m } from "motion/react";
import { useMemo, useState } from "react";
import { TripCard } from "@/components/trip/TripCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SectionCopy, TripCategory } from "@/content/types";
import { cn } from "@/lib/cn";
import { CATEGORY_LABEL, type TripView } from "@/lib/trips";

type Filter = "all" | TripCategory;

/**
 * Daftar open trip terdekat.
 * Mobile: geser horizontal (scroll-snap). Desktop: grid.
 */
export function UpcomingTrips({ copy, trips }: { copy: SectionCopy; trips: TripView[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filters = useMemo(() => {
    const present = Array.from(new Set(trips.map((t) => t.category)));
    return [{ value: "all" as Filter, label: "Semua", count: trips.length }].concat(
      present.map((c) => ({ value: c, label: CATEGORY_LABEL[c], count: trips.filter((t) => t.category === c).length })),
    );
  }, [trips]);

  const visible = filter === "all" ? trips : trips.filter((t) => t.category === filter);

  return (
    <section id="trips" aria-labelledby="trips-title" className="py-16 sm:py-24">
      <Container className="flex flex-col gap-8 sm:gap-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading copy={copy} id="trips-title" />
          <div role="group" aria-label="Filter kategori trip" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:px-0 lg:flex-wrap lg:justify-end">
            {filters.map((f) => {
              const active = f.value === filter;
              return (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "relative shrink-0 rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition-transform active:scale-95",
                    active ? "text-cream" : "bg-cream text-ink hover:-translate-y-0.5",
                  )}
                >
                  {active && <m.span layoutId="trip-filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="relative">
                    {f.label} <span className={active ? "text-lime" : "text-muted"}>{f.count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <ul
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-6 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4"
          aria-live="polite"
        >
          {visible.map((trip, i) => (
            <m.li
              key={trip.slug}
              layout="position"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.2, 0.9, 0.25, 1] }}
              className="w-[82%] shrink-0 snap-start xs:w-[70%] sm:w-[46%] md:w-auto"
            >
              <TripCard trip={trip} />
            </m.li>
          ))}
        </ul>
        <p className="-mt-4 text-center text-sm font-medium text-muted md:hidden">Geser untuk lihat trip lainnya</p>
      </Container>
    </section>
  );
}
