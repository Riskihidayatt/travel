import { getTrips, site } from "@/content";
import { todayISO } from "@/lib/dates";
import { formatRupiah } from "@/lib/format";
import { buildTripViews } from "@/lib/trips";
import { OG_SIZE, renderOg } from "../../_og/render";

export const alt = "Detail open trip";
export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 86400;

export function generateStaticParams() {
  return getTrips(todayISO()).map((t) => ({ slug: t.slug }));
}

const BADGE_TONE = { open: "lime", "almost-full": "tangerine", full: "ink", finished: "cream" } as const;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const today = todayISO();
  const trip = buildTripViews(getTrips(today), today).find((t) => t.slug === slug);
  if (!trip) {
    return renderOg({ brand: site.name, photoUrl: "", eyebrow: "Open trip", title: site.tagline, lines: [] });
  }
  const { availability } = trip;
  return renderOg({
    brand: site.name,
    photoUrl: trip.coverImage.src.replace(/w=\d+/, "w=1000"),
    eyebrow: `${trip.destination} · ${trip.durationLabel}`,
    title: trip.title,
    lines: [
      availability.isBookable ? `${trip.dateLabel} · sisa ${availability.seatsLeft} seat` : `${trip.dateLabel} · ${availability.label}`,
    ],
    badge: { text: availability.label, tone: BADGE_TONE[availability.status] },
    price: formatRupiah(trip.price),
  });
}
