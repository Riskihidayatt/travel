import { ArrowUpRight, CalendarDays, ChevronRight, Clock3, MapPin, Navigation, Sparkles, Tag } from "lucide-react";
import type { ReactNode } from "react";
import { AppLink } from "@/components/primitives/AppLink";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { StatusSticker } from "@/components/ui/StatusSticker";
import { CATEGORY_LABEL, type TripView } from "@/lib/trips";
import { BookingSidebar, MobileBookingBar, type BookingCta } from "./BookingPanel";
import { IncludeExclude } from "./IncludeExclude";
import { Itinerary } from "./Itinerary";
import { TripCard } from "./TripCard";
import { TripGalleryHero } from "./TripGalleryHero";

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <Reveal>
        <h2 id={id} className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

export function TripDetail({
  trip,
  related,
  cta,
  askHref,
}: {
  trip: TripView;
  related: TripView[];
  cta: BookingCta;
  askHref: string;
}) {
  const { availability } = trip;

  return (
    <>
      <div className="pt-20 pb-32 sm:pt-24 lg:pb-20">
        <Container className="flex flex-col gap-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm font-medium text-muted">
              <li className="inline-flex items-center gap-1">
                <AppLink href="/" className="hover:text-ink">
                  Beranda
                </AppLink>
                <ChevronRight aria-hidden="true" className="size-4" />
              </li>
              <li className="inline-flex items-center gap-1">
                <AppLink href="/#trips" className="hover:text-ink">
                  Open Trip
                </AppLink>
                <ChevronRight aria-hidden="true" className="size-4" />
              </li>
              <li aria-current="page" className="font-semibold text-ink">
                {trip.title}
              </li>
            </ol>
          </nav>

          <TripGalleryHero photos={trip.gallery.length ? trip.gallery : [trip.coverImage]} title={trip.title} />

          <div className="mt-4 grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
            <div className="flex min-w-0 flex-col gap-14">
              <header className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusSticker status={availability.status} label={availability.label} />
                  <span className="rounded-full border-2 border-ink bg-lilac px-3 py-1 text-xs font-bold tracking-wide uppercase">
                    {CATEGORY_LABEL[trip.category]}
                  </span>
                </div>
                <h1 className="fade-up font-display text-[clamp(2.5rem,9vw,5rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-balance">
                  {trip.title}
                </h1>
                <p className="fade-up max-w-2xl text-lg text-muted sm:text-xl" style={{ ["--delay" as string]: "120ms" }}>
                  {trip.tagline}
                </p>
                <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { icon: MapPin, label: "Destinasi", value: trip.destination },
                    { icon: CalendarDays, label: "Tanggal", value: trip.dateLabel },
                    { icon: Clock3, label: "Durasi", value: trip.durationLabel },
                    { icon: Navigation, label: "Meeting point", value: trip.meetingPoint.name },
                  ].map(({ icon: IconCmp, label, value }) => (
                    <div key={label} className="rounded-2xl border-2 border-ink bg-cream-deep p-3.5">
                      <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                        <IconCmp aria-hidden="true" className="size-3.5" />
                        {label}
                      </dt>
                      <dd className="mt-1 text-[15px] leading-snug font-bold">{value}</dd>
                    </div>
                  ))}
                </dl>
                {trip.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-2" aria-label="Tag trip">
                    {trip.tags.map((t) => (
                      <li key={t} className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-cream">
                        <Tag aria-hidden="true" className="size-3" />
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </header>

              <Block id="tentang" title="Tentang trip ini">
                <Reveal>
                  <p className="max-w-2xl text-base leading-relaxed text-ink/85 sm:text-lg">{trip.description}</p>
                </Reveal>
                <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2">
                  {trip.highlights.map((h, i) => (
                    <RevealItem
                      as="li"
                      key={h}
                      className={`flex items-start gap-3 rounded-2xl border-2 border-ink p-4 font-semibold ${["bg-lime", "bg-sky", "bg-bubblegum", "bg-lilac"][i % 4]}`}
                    >
                      <Sparkles aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                      {h}
                    </RevealItem>
                  ))}
                </RevealGroup>
              </Block>

              <Block id="itinerary" title="Itinerary">
                <Itinerary days={trip.itinerary} />
              </Block>

              <Block id="fasilitas" title="Include & exclude">
                <IncludeExclude includes={trip.includes} excludes={trip.excludes} />
              </Block>

              <Block id="meeting-point" title="Meeting point">
                <Reveal className="flex flex-col gap-4 rounded-card border-2 border-ink bg-cream p-5 shadow-sticker sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="flex gap-4">
                    <span className="grid size-12 shrink-0 -rotate-6 place-items-center rounded-2xl border-2 border-ink bg-tangerine">
                      <MapPin aria-hidden="true" className="size-6" />
                    </span>
                    <div>
                      <p className="font-display text-xl font-extrabold">{trip.meetingPoint.name}</p>
                      <p className="text-[15px] text-muted">{trip.meetingPoint.address}</p>
                      <p className="mt-1 text-sm font-bold">Kumpul jam {trip.meetingPoint.time}</p>
                    </div>
                  </div>
                  {trip.meetingPoint.mapsUrl && (
                    <AppLink
                      href={trip.meetingPoint.mapsUrl}
                      className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-full border-2 border-ink bg-lime px-4 text-sm font-bold transition-transform hover:-translate-y-0.5"
                    >
                      Buka Google Maps
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </AppLink>
                  )}
                </Reveal>
              </Block>
            </div>

            <div className="hidden lg:block">
              <BookingSidebar trip={trip} cta={cta} askHref={askHref} />
            </div>
          </div>

          {related.length > 0 && (
            <section aria-labelledby="related-title" className="mt-20 flex flex-col gap-8">
              <Reveal>
                <h2 id="related-title" className="font-display text-[clamp(2rem,6vw,3.5rem)] leading-none font-extrabold tracking-tight">
                  Trip lain yang mungkin kamu suka
                </h2>
              </Reveal>
              <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
                {related.map((t) => (
                  <li key={t.slug} className="w-[82%] shrink-0 snap-start xs:w-[70%] md:w-auto">
                    <TripCard trip={t} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Container>
      </div>
      <MobileBookingBar trip={trip} cta={cta} />
    </>
  );
}
