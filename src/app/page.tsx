import { ClosingCta } from "@/components/sections/ClosingCta";
import { DestinationMarquee } from "@/components/sections/DestinationMarquee";
import { Faq } from "@/components/sections/Faq";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { UpcomingTrips } from "@/components/sections/UpcomingTrips";
import { WhyUs } from "@/components/sections/WhyUs";
import { faqs, gallery, getTrips, home, site, testimonials } from "@/content";
import { todayISO } from "@/lib/dates";
import { getSiteUrl } from "@/lib/site-url";
import { buildTripViews, getUpcomingBookableTrips } from "@/lib/trips";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { SiteChrome } from "./site-chrome";

/** Halaman statis, di-generate ulang tiap 24 jam agar status & tanggal trip selalu segar. */
export const revalidate = 86400;

export default function HomePage() {
  const today = todayISO();
  const trips = buildTripViews(getTrips(today), today);
  const upcoming = getUpcomingBookableTrips(trips, 5);
  const whatsappHref = buildWhatsAppLink(site.whatsapp.number, site.whatsapp.defaultMessage);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    description: site.description,
    url: getSiteUrl(),
    email: site.email,
    telephone: `+${site.whatsapp.number}`,
    address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "ID" },
    sameAs: Object.values(site.social).filter(Boolean),
  };

  return (
    <SiteChrome navTone="light">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero
        content={home.hero}
        whatsappHref={whatsappHref}
        upcoming={upcoming.map((t) => ({
          slug: t.slug,
          title: t.title,
          destination: t.destination,
          dateLabel: t.dateLabelShort,
          seatsLeft: t.availability.seatsLeft,
        }))}
      />
      <DestinationMarquee destinations={site.destinations} />
      <UpcomingTrips copy={home.trips} trips={trips} />
      <WhyUs copy={home.why} features={home.features} />
      <HowItWorks copy={home.how} steps={home.steps} />
      <Stats copy={home.stats} stats={home.statItems} brandName={site.name} />
      <Testimonials copy={home.testimonials} testimonials={testimonials} brandName={site.name} />
      <Gallery copy={home.gallery} photos={gallery} />
      <Faq copy={home.faq} faqs={faqs} whatsappHref={whatsappHref} />
      <ClosingCta content={home.closing} whatsappHref={whatsappHref} />
      <FloatingWhatsApp href={whatsappHref} />
    </SiteChrome>
  );
}
