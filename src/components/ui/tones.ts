import type { Tone } from "@/content/types";

/** Kelas background + teks per tone (semua lolos kontras AA dengan teks ink). */
export const TONE_BG: Record<Tone, string> = {
  lime: "bg-lime text-ink",
  tangerine: "bg-tangerine text-ink",
  lilac: "bg-lilac text-ink",
  sky: "bg-sky text-ink",
  bubblegum: "bg-bubblegum text-ink",
  cream: "bg-cream-deep text-ink",
};
