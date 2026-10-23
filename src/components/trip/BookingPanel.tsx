import { CalendarDays, Clock3, ShieldCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { QuotaBar } from "@/components/ui/QuotaBar";
import { StatusSticker } from "@/components/ui/StatusSticker";
import { formatRupiah } from "@/lib/format";
import type { TripView } from "@/lib/trips";

export interface BookingCta {
  href: string;
  label: string;
}

function Price({ trip, large = false }: { trip: TripView; large?: boolean }) {
  const saving = trip.originalPrice ? trip.originalPrice - trip.price : 0;
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold text-muted">Harga per orang</p>
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <p className={large ? "font-display text-4xl leading-none font-extrabold tracking-tight" : "font-display text-2xl leading-none font-extrabold"}>
          {formatRupiah(trip.price)}
        </p>
        {trip.originalPrice && (
          <p className="text-sm text-muted">
            <span className="sr-only">Harga normal </span>
            <s>{formatRupiah(trip.originalPrice)}</s>
          </p>
        )}
      </div>
      {large && saving > 0 && (
        <p className="mt-1 w-fit -rotate-1 rounded-full border-2 border-ink bg-lime px-2.5 py-0.5 text-xs font-bold">
          Hemat {formatRupiah(saving, { compact: true })}
        </p>
      )}
    </div>
  );
}

/** Sidebar sticky (desktop). */
export function BookingSidebar({ trip, cta, askHref }: { trip: TripView; cta: BookingCta; askHref: string }) {
  const { availability } = trip;
  return (
    <aside aria-label="Pemesanan" className="sticky top-28 flex flex-col gap-5 rounded-card border-2 border-ink bg-cream p-6 shadow-pop">
      <div className="flex items-start justify-between gap-3">
        <Price trip={trip} large />
        <StatusSticker status={availability.status} label={availability.label} />
      </div>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border-2 border-ink bg-cream-deep p-3">
          <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted">
            <CalendarDays aria-hidden="true" className="size-3.5" /> Tanggal
          </dt>
          <dd className="mt-1 font-bold">{trip.dateLabel}</dd>
        </div>
        <div className="rounded-2xl border-2 border-ink bg-cream-deep p-3">
          <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted">
            <Clock3 aria-hidden="true" className="size-3.5" /> Durasi
          </dt>
          <dd className="mt-1 font-bold">{trip.durationLabel}</dd>
        </div>
      </dl>
      <QuotaBar availability={availability} total={trip.quota.total} />
      <div className="flex flex-col gap-3">
        <ButtonLink href={cta.href} variant={availability.isBookable ? "whatsapp" : "lime"} size="lg" fullWidth>
          <WhatsAppIcon size={20} />
          {cta.label}
        </ButtonLink>
        <ButtonLink href={askHref} variant="cream" fullWidth shadow={false}>
          Tanya admin dulu
        </ButtonLink>
      </div>
      <p className="flex items-start gap-2 text-xs text-muted">
        <ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-ink" />
        DP 30% untuk amankan seat. Pelunasan H-14. Semua peserta ter-cover asuransi.
      </p>
    </aside>
  );
}

/** Bottom bar sticky (mobile). */
export function MobileBookingBar({ trip, cta }: { trip: TripView; cta: BookingCta }) {
  const { availability } = trip;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-cream/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-lg lg:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-xl leading-none font-extrabold">{formatRupiah(trip.price)}</p>
          <p className={availability.status === "almost-full" ? "mt-1 text-xs font-bold text-tangerine-deep" : "mt-1 text-xs font-semibold text-muted"}>
            {availability.isBookable ? `Sisa ${availability.seatsLeft} seat · ${trip.dateLabelShort}` : availability.label}
          </p>
        </div>
        <ButtonLink href={cta.href} variant={availability.isBookable ? "whatsapp" : "lime"} shadow={false} className="shrink-0">
          <WhatsAppIcon size={18} />
          <span className="max-[380px]:hidden">{cta.label}</span>
          <span className="min-[381px]:hidden">{availability.isBookable ? "Daftar" : availability.status === "full" ? "Waiting list" : "Tanya"}</span>
        </ButtonLink>
      </div>
    </div>
  );
}
