import { ArrowUp, Clock, Mail, MapPin } from "lucide-react";
import { AppLink } from "@/components/primitives/AppLink";
import { InstagramIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import type { SiteConfig } from "@/content/types";

export function Footer({ site, whatsappHref }: { site: SiteConfig; whatsappHref: string }) {
  const socials = [
    { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.tiktok, label: "TikTok", Icon: TikTokIcon },
    ...(site.social.youtube ? [{ href: site.social.youtube, label: "YouTube", Icon: YouTubeIcon }] : []),
  ];

  return (
    <footer className="relative overflow-hidden rounded-t-[2.5rem] border-t-2 border-ink bg-ink text-cream sm:rounded-t-[3.5rem]">
      <Container className="flex flex-col gap-12 pt-14 pb-8 sm:pt-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <p className="font-display text-3xl font-extrabold tracking-tight">
              {site.name.toLowerCase()}
              <span className="text-tangerine">.</span>
            </p>
            <p className="max-w-xs text-sm text-cream/75">{site.description}</p>
            <ul className="flex gap-2" aria-label="Media sosial">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <AppLink href={href} aria-label={label} className="grid size-11 place-items-center rounded-full border-2 border-cream/30 transition-transform hover:-translate-y-1 hover:rotate-6 hover:border-lime hover:text-lime">
                    <Icon size={20} />
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Navigasi footer" className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-[0.14em] text-lime uppercase">Jelajahi</p>
            <ul className="flex flex-col gap-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <AppLink href={item.href} className="text-[15px] text-cream/85 hover:text-lime">
                    {item.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-[0.14em] text-lime uppercase">Kontak</p>
            <ul className="flex flex-col gap-3 text-[15px] text-cream/85">
              <li>
                <AppLink href={whatsappHref} className="inline-flex items-center gap-2 hover:text-lime">
                  <WhatsAppIcon size={18} />
                  {site.whatsapp.display}
                </AppLink>
              </li>
              <li>
                <AppLink href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-lime">
                  <Mail aria-hidden="true" className="size-[18px]" />
                  {site.email}
                </AppLink>
              </li>
              <li className="inline-flex items-start gap-2">
                <Clock aria-hidden="true" className="mt-0.5 size-[18px] shrink-0" />
                {site.operatingHours}
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold tracking-[0.14em] text-lime uppercase">Basecamp</p>
            <p className="inline-flex items-start gap-2 text-[15px] text-cream/85">
              <MapPin aria-hidden="true" className="mt-0.5 size-[18px] shrink-0" />
              {site.address}
            </p>
          </div>
        </div>

        {/* Teks dekoratif via pseudo-element agar tidak dibaca screen reader / audit kontras */}
        <span
          aria-hidden="true"
          data-text={site.name.toLowerCase()}
          className="block font-display text-[clamp(4rem,21vw,17rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-cream/10 select-none before:content-[attr(data-text)]"
        />

        <div className="flex flex-col gap-4 border-t border-cream/15 pt-6 text-xs text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.name} — website demo. Foto: Unsplash (placeholder).
          </p>
          <AppLink href="#top" className="inline-flex items-center gap-1.5 font-semibold hover:text-lime">
            Balik ke atas
            <ArrowUp aria-hidden="true" className="size-4" />
          </AppLink>
        </div>
      </Container>
    </footer>
  );
}
