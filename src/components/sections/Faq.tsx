import { MessageCircle } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Faq as FaqItem, HomeContent } from "@/content/types";

export function Faq({ copy, faqs, whatsappHref }: { copy: HomeContent["faq"]; faqs: FaqItem[]; whatsappHref: string }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading copy={copy} id="faq-title" tone="lime" />
          <Reveal delay={0.1}>
            <ButtonLink href={whatsappHref} variant="ink" className="w-fit">
              <MessageCircle aria-hidden="true" className="size-5" />
              {copy.ctaLabel}
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal>
          <Accordion
            defaultOpenIds={["faq-0"]}
            items={faqs.map((f, i) => ({
              id: `faq-${i}`,
              title: f.question,
              content: <p className="text-[15px] leading-relaxed text-ink/85 sm:text-base">{f.answer}</p>,
            }))}
          />
        </Reveal>
      </Container>
    </section>
  );
}
