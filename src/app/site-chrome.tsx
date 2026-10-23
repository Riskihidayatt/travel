import type { ReactNode } from "react";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { site } from "@/content";
import { buildWhatsAppLink } from "@/lib/whatsapp";

/**
 * Kerangka halaman (route-level): mengambil konten lalu mengoper ke komponen
 * presentational Navbar & Footer.
 */
export function SiteChrome({ children, navTone = "dark", footer = true }: { children: ReactNode; navTone?: "light" | "dark"; footer?: boolean }) {
  const whatsappHref = buildWhatsAppLink(site.whatsapp.number, site.whatsapp.defaultMessage);
  return (
    <>
      <Navbar
        brandName={site.name}
        handle={site.handle}
        items={site.nav}
        whatsappHref={whatsappHref}
        social={site.social}
        tone={navTone}
      />
      <main id="main">{children}</main>
      {footer && <Footer site={site} whatsappHref={whatsappHref} />}
    </>
  );
}
