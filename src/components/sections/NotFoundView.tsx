import { ArrowLeft, Compass, MapPinOff } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";

/** Halaman 404 on-brand. */
export function NotFoundView({ whatsappHref }: { whatsappHref: string }) {
  return (
    <section aria-labelledby="nf-title" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16">
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <p aria-hidden="true" className="font-display text-[clamp(7rem,34vw,18rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-ink">
            4
            <span className="inline-grid size-[0.78em] animate-[spin_9s_linear_infinite] place-items-center rounded-full border-[0.05em] border-ink bg-lime align-middle">
              <Compass className="size-[0.55em]" strokeWidth={2} />
            </span>
            4
          </p>
          <span className="absolute -top-2 -right-4 rotate-12 rounded-full border-2 border-ink bg-tangerine px-4 py-1.5 font-display text-sm font-extrabold uppercase shadow-sticker sm:-right-10 sm:text-base">
            Nyasar?
          </span>
        </div>
        <h1 id="nf-title" className="max-w-2xl font-display text-[clamp(2rem,6vw,3.5rem)] leading-none font-extrabold tracking-tight text-balance">
          Waduh, kamu nyasar kejauhan.
        </h1>
        <p className="inline-flex max-w-md items-start gap-2 text-left text-base text-muted sm:text-lg">
          <MapPinOff aria-hidden="true" className="mt-1 size-5 shrink-0" />
          Halaman ini nggak ada di itinerary mana pun. Tenang, trip leader kami siap antar kamu balik.
        </p>
        <div className="mt-2 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href="/" variant="ink" size="lg">
            <ArrowLeft aria-hidden="true" className="size-5" />
            Balik ke beranda
          </ButtonLink>
          <ButtonLink href={whatsappHref} variant="lime" size="lg">
            <WhatsAppIcon size={20} />
            Tanya admin
          </ButtonLink>
        </div>
      </Container>
      <div aria-hidden="true" className="mt-16 -rotate-2 border-y-2 border-ink bg-lime py-3">
        <Marquee duration={30}>
          {["Salah belok", "Sinyal hilang", "Kebablasan", "Putar balik", "Gaskeun lagi"].map((t) => (
            <span key={t} className="flex items-center gap-5 pr-5 font-display text-2xl font-extrabold uppercase sm:text-4xl">
              {t}
              <Compass className="size-6 sm:size-8" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
