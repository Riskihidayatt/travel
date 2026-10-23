import { localPhotos, unsplash } from "./media";
import type { GalleryPhoto } from "./types";

/**
 * Foto galeri. Sebagian foto lokal (public/images/destinations), sisanya placeholder Unsplash.
 * `aspect` menentukan bentuk tile di masonry.
 */
export const gallery: GalleryPhoto[] = [
  { ...localPhotos.padar, location: "Padar, Labuan Bajo", aspect: "landscape" },
  { ...localPhotos.bromo, location: "Bromo", aspect: "landscape" },
  { ...localPhotos.kelingking, location: "Nusa Penida", aspect: "square" },
  { ...localPhotos.piaynemo, location: "Raja Ampat", aspect: "landscape" },
  { src: unsplash("LdOdyJH-CJc", 1400), alt: "Pendaki di puncak gunung Sembalun", location: "Rinjani", aspect: "landscape", credit: "Unsplash" },
  { ...localPhotos.toraja, location: "Toraja", aspect: "landscape" },
  { src: unsplash("-N0QZc1D1i0", 1400), alt: "Anak-anak Sumba bersama kuda di savana", location: "Sumba Timur", aspect: "portrait", credit: "Unsplash" },
  { src: unsplash("DpnX0AX27iA", 1400), alt: "Dermaga dan kapal di Labuan Bajo", location: "Labuan Bajo", aspect: "landscape", credit: "Unsplash" },
  { src: unsplash("HKTDt5nK_a4", 1400), alt: "Pohon kelapa berjajar di Karimunjawa", location: "Karimunjawa", aspect: "portrait", credit: "Unsplash" },
  { src: unsplash("Qq0Coemj0Ng", 1400), alt: "Sawah hijau dengan Gunung Rinjani di kejauhan", location: "Tetebatu, Lombok", aspect: "landscape", credit: "Unsplash" },
  { src: unsplash("BSq0evBiUNs", 1400), alt: "Dermaga kayu menuju homestay tropis", location: "Raja Ampat", aspect: "square", credit: "Unsplash" },
  { src: unsplash("-EJSdbwW-bE", 1400), alt: "Rombongan pendaki saat sunrise", location: "Sindoro", aspect: "portrait", credit: "Unsplash" },
];
