import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TripDetail } from "@/components/trip/TripDetail";
import { getTrips, site } from "@/content";
import { todayISO } from "@/lib/dates";
import { formatRupiah } from "@/lib/format";
import { getSiteUrl } from "@/lib/site-url";
import { buildTripViews, getRelatedTrips } from "@/lib/trips";
import { buildTripMessage, buildWhatsAppLink, getTripCtaLabel } from "@/lib/whatsapp";
import { SiteChrome } from "../../site-chrome";

export const revalidate = 86400;
export const dynamicParams = false;

function loadTrip(slug: string) {
  const today = todayISO();
  const trips = buildTripViews(getTrips(today), today);
  const trip = trips.find((t) => t.slug === slug);
  return { trip, trips };
}

export function generateStaticParams() {
  return getTrips(todayISO()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/trips/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { trip } = loadTrip(slug);
  if (!trip) return {};
  const title = `${trip.title} · ${trip.dateLabel}`;
  const description = `${trip.tagline} ${trip.durationLabel}, mulai ${formatRupiah(trip.price)}. ${trip.availability.isBookable ? `Sisa ${trip.availability.seatsLeft} seat!` : trip.availability.label}.`;
  return {
    title,
    description,
    alternates: { canonical: `/trips/${trip.slug}` },
    openGraph: { type: "website", title, description, url: `/trips/${trip.slug}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TripPage({ params }: PageProps<"/trips/[slug]">) {
  const { slug } = await params;
  const { trip, trips } = loadTrip(slug);
  if (!trip) notFound();

  const message = buildTripMessage({
    brandName: site.name,
    tripTitle: trip.title,
    dateLabel: trip.dateLabel,
    status: trip.availability.status,
  });
  const cta = {
    href: buildWhatsAppLink(site.whatsapp.number, message),
    label: getTripCtaLabel(trip.availability.status),
  };
  const askHref = buildWhatsAppLink(site.whatsapp.number, `Halo ${site.name}! Mau tanya-tanya dulu soal trip *${trip.title}* (${trip.dateLabel}).`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.title,
    description: trip.description,
    url: `${getSiteUrl()}/trips/${trip.slug}`,
    touristType: trip.tags,
    itinerary: {
      "@type": "ItemList",
      itemListElement: trip.itinerary.map((d) => ({ "@type": "ListItem", position: d.day, name: `Hari ${d.day}: ${d.title}` })),
    },
    offers: {
      "@type": "Offer",
      price: trip.price,
      priceCurrency: "IDR",
      availability: trip.availability.isBookable ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      validFrom: trip.startDate,
    },
    provider: { "@type": "TravelAgency", name: site.name, url: getSiteUrl() },
  };

  return (
    <SiteChrome>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <TripDetail trip={trip} related={getRelatedTrips(trips, trip)} cta={cta} askHref={askHref} />
    </SiteChrome>
  );
}
