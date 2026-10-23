import { ArrowRight, Mountain, Sailboat, Sun } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { ClosingCtaContent } from "@/content/types";

export function ClosingCta({ content, whatsappHref }: { content: ClosingCtaContent; whatsappHref: string }) {
  return (
    <section aria-labelledby="closing-title" className="pb-16 sm:pb-24">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[2.5rem] border-2 border-ink bg-tangerine px-5 py-14 text-ink shadow-pop-lg sm:rounded-[3.5rem] sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          {/* Stiker dekoratif */}
          <span aria-hidden="true" className="absolute top-6 right-6 hidden size-20 animate-float place-items-center rounded-full border-2 border-ink bg-lime sm:grid" style={{ ["--float-rotate" as string]: "12deg" }}>
            <Sun className="size-9" strokeWidth={2.25} />
          </span>
          <span aria-hidden="true" className="absolute bottom-8 left-[55%] hidden size-16 animate-float place-items-center rounded-2xl border-2 border-ink bg-lilac [animation-delay:-2s] lg:grid" style={{ ["--float-rotate" as string]: "-10deg" }}>
            <Mountain className="size-8" strokeWidth={2.25} />
          </span>
          <span aria-hidden="true" className="absolute right-10 bottom-10 hidden size-24 animate-float place-items-center rounded-full border-2 border-ink bg-sky [animation-delay:-1s] md:grid" style={{ ["--float-rotate" as string]: "8deg" }}>
            <Sailboat className="size-11" strokeWidth={2} />
          </span>
          <span aria-hidden="true" className="absolute -top-24 -left-24 -z-10 size-72 rounded-full bg-[radial-gradient(circle,var(--color-bubblegum),transparent_70%)] opacity-70" />

          <div className="flex max-w-3xl flex-col gap-6">
            <Eyebrow tone="cream">{content.eyebrow}</Eyebrow>
            <h2 id="closing-title" className="font-display text-[clamp(2.6rem,10vw,6.5rem)] leading-[0.9] font-extrabold tracking-[-0.045em] text-balance">
              {content.title}
            </h2>
            <p className="max-w-xl text-base font-medium sm:text-lg">{content.description}</p>
            <div className="mt-2 flex flex-col gap-3 xs:flex-row">
              <ButtonLink href={whatsappHref} variant="ink" size="lg">
                <WhatsAppIcon size={20} />
                {content.primaryLabel}
              </ButtonLink>
              <ButtonLink href={content.secondaryCta.href} variant="cream" size="lg">
                {content.secondaryCta.label}
                <ArrowRight aria-hidden="true" className="size-5" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
