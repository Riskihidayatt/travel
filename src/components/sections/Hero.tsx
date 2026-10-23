import { ArrowDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SpinningSticker } from "@/components/ui/SpinningSticker";
import type { HeroContent } from "@/content/types";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroTripTicker, type TripChip } from "./HeroTripTicker";

function Words({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <span className="word-reveal" style={{ ["--i" as string]: i + offset }}>
            {word}
          </span>
          {" "}
        </span>
      ))}
    </>
  );
}

export function Hero({ content, whatsappHref, upcoming }: { content: HeroContent; whatsappHref: string; upcoming: TripChip[] }) {
  const leadCount = content.headlineLead.split(" ").length;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink text-cream">
      <HeroBackdrop slides={content.slides} video={content.backgroundVideo} />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pt-28 pb-10 sm:pb-16 md:justify-center md:pt-32 md:pb-20">
        <SpinningSticker text={content.stickerText} className="absolute top-24 right-5 hidden md:block lg:top-28 lg:right-8" />

        <p className="fade-up mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-cream/40 bg-ink/40 px-3.5 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-md sm:text-sm">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping-soft rounded-full bg-lime" />
            <span className="relative size-2 rounded-full bg-lime" />
          </span>
          {content.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="max-w-[16ch] font-display text-[clamp(2.9rem,12.5vw,8.25rem)] leading-[0.9] font-extrabold tracking-[-0.045em]"
        >
          <span className="sr-only">
            {content.headlineLead} {content.headlineHighlight} {content.headlineTail}
          </span>
          <span aria-hidden="true">
            <Words text={content.headlineLead} />
            <span className="inline-block overflow-hidden pt-[0.06em] pb-[0.12em] align-bottom">
              <span className="word-reveal" style={{ ["--i" as string]: leadCount }}>
                <span className="inline-flex -rotate-2 rounded-[0.22em] border-[3px] border-ink bg-tangerine px-[0.18em] text-ink shadow-[0.07em_0.07em_0_0_var(--color-lime)]">
                  {content.headlineHighlight}
                </span>
              </span>
              {"\u00a0"}
            </span>
            <br className="hidden lg:block" />
            <Words text={content.headlineTail} offset={leadCount + 1} />
          </span>
        </h1>

        <div className="mt-6 flex flex-col gap-8 lg:mt-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-xl flex-col gap-6">
            <p className="fade-up text-base text-cream/90 sm:text-lg" style={{ ["--delay" as string]: "550ms" }}>
              {content.subheadline}
            </p>
            <div className="fade-up flex flex-col gap-3 xs:flex-row" style={{ ["--delay" as string]: "650ms" }}>
              <ButtonLink href={content.primaryCta.href} variant="tangerine" size="lg" shadow={false}>
                {content.primaryCta.label}
                <ArrowDown aria-hidden="true" className="size-5" strokeWidth={2.5} />
              </ButtonLink>
              <ButtonLink href={whatsappHref} variant="cream" size="lg" shadow={false}>
                <WhatsAppIcon size={20} />
                {content.secondaryCtaLabel}
              </ButtonLink>
            </div>
          </div>

          {upcoming.length > 0 && (
            <div className="fade-up" style={{ ["--delay" as string]: "800ms" }}>
              <HeroTripTicker trips={upcoming} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
