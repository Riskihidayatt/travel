import type { Metadata } from "next";
import { NotFoundView } from "@/components/sections/NotFoundView";
import { site } from "@/content";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { SiteChrome } from "./site-chrome";

export const metadata: Metadata = {
  title: "Waduh, nyasar!",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SiteChrome footer={false}>
      <NotFoundView whatsappHref={buildWhatsAppLink(site.whatsapp.number, "Halo! Aku nyasar di website, bisa bantu cariin trip?")} />
    </SiteChrome>
  );
}
