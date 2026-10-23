import { ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { AppImage } from "@/components/primitives/AppImage";
import { AppLink } from "@/components/primitives/AppLink";
import { QuotaBar } from "@/components/ui/QuotaBar";
import { StatusSticker } from "@/components/ui/StatusSticker";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/cn";
import { formatRupiah } from "@/lib/format";
import type { TripView } from "@/lib/trips";

/** Kartu paket open trip. Presentational: semua data lewat props. */
export function TripCard({ trip, className, priority = false }: { trip: TripView; className?: string; priority?: boolean }) {
  const { availability } = trip;
  const finished = availability.status === "finished";

  return (
    <TiltCard className={cn("h-full", className)}>
      <AppLink
        href={`/trips/${trip.slug}`}
        aria-label={`${trip.title}, ${trip.dateLabel}, ${availability.label}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-card border-2 border-ink bg-cream shadow-sticker transition-transform duration-300 hover:-translate-y-1 focus-visible:rounded-card"
      >
        <div className="relative aspect-[4/3.6] overflow-hidden border-b-2 border-ink">
          <AppImage
            src={trip.coverImage.src}
            alt={trip.coverImage.alt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 82vw"
            className={cn(
              "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]",
              finished && "grayscale-[70%]",
            )}
          />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/60 to-transparent" />
          <StatusSticker status={availability.status} label={availability.label} className="absolute top-3 left-3" />
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full border-2 border-ink bg-cream px-2.5 py-0.5 text-xs font-bold">
            <Clock3 aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
            {trip.durationLabel}
          </span>
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-sm font-semibold text-cream">
            <MapPin aria-hidden="true" className="size-4" strokeWidth={2.5} />
            {trip.destination}
          </span>
          <span
            aria-hidden="true"
            className="absolute right-3 bottom-3 grid size-10 translate-y-2 place-items-center rounded-full border-2 border-ink bg-lime opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
          >
            <ArrowUpRight className="size-5" strokeWidth={2.75} />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
          <div className="flex flex-col gap-1.5">
            <h3 className="font-display text-xl leading-tight font-extrabold tracking-tight text-balance">{trip.title}</h3>
            <p className="inline-flex items-center gap-1.5 text-sm font-medium text-muted">
              <CalendarDays aria-hidden="true" className="size-4" strokeWidth={2.25} />
              {trip.dateLabel}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="flex flex-wrap items-center gap-x-2 text-xs font-semibold text-muted">
                Mulai dari
                {trip.originalPrice && (
                  <span>
                    <span className="sr-only">, harga normal </span>
                    <s>{formatRupiah(trip.originalPrice)}</s>
                  </span>
                )}
              </p>
              <p className="font-display text-2xl leading-none font-extrabold">{formatRupiah(trip.price)}</p>
            </div>
            <QuotaBar availability={availability} total={trip.quota.total} />
          </div>
        </div>
      </AppLink>
    </TiltCard>
  );
}
