import { home, site } from "@/content";
import { OG_SIZE, renderOg } from "./_og/render";

export const alt = `${site.name} — ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return renderOg({
    brand: site.name,
    photoUrl: home.hero.slides[0].fallbackSrc ?? home.hero.slides[0].src,
    eyebrow: "Open trip anak muda",
    title: `${home.hero.headlineLead} ${home.hero.headlineHighlight} bareng circle baru`,
    lines: ["Bromo, Bajo, Penida, Rinjani, Raja Ampat & lainnya."],
    badge: { text: "Open trip", tone: "lime" },
  });
}
