import { unsplash } from "./media";
import type { GalleryPhoto } from "./types";

/** Foto galeri (PLACEHOLDER Unsplash). `aspect` menentukan bentuk tile di masonry. */
export const gallery: GalleryPhoto[] = [
  { src: unsplash("TG50QzQzZm0", 1400), alt: "Perbukitan Pulau Padar dengan teluk biru", location: "Padar, Labuan Bajo", aspect: "portrait", credit: "Unsplash" },
  { src: unsplash("LjUpw15tBaY", 1400), alt: "Kaldera Bromo diselimuti abu vulkanik", location: "Bromo", aspect: "landscape", credit: "Unsplash" },
  { src: unsplash("oOewK0KGXtI", 1400), alt: "Tebing Kelingking Beach di Nusa Penida", location: "Nusa Penida", aspect: "square", credit: "Unsplash" },
  { src: unsplash("4tMHO3NbUEc", 1400), alt: "Gugusan pulau karst Piaynemo dari udara", location: "Raja Ampat", aspect: "portrait", credit: "Unsplash" },
  { src: unsplash("LdOdyJH-CJc", 1400), alt: "Pendaki di puncak gunung Sembalun", location: "Rinjani", aspect: "landscape", credit: "Unsplash" },
  { src: unsplash("CD4nKcF6n40", 1400), alt: "Rumah tongkonan di tengah hutan Toraja", location: "Toraja", aspect: "square", credit: "Unsplash" },
  { src: unsplash("-N0QZc1D1i0", 1400), alt: "Anak-anak Sumba bersama kuda di savana", location: "Sumba Timur", aspect: "portrait", credit: "Unsplash" },
  { src: unsplash("DpnX0AX27iA", 1400), alt: "Dermaga dan kapal di Labuan Bajo", location: "Labuan Bajo", aspect: "landscape", credit: "Unsplash" },
  { src: unsplash("HKTDt5nK_a4", 1400), alt: "Pohon kelapa berjajar di Karimunjawa", location: "Karimunjawa", aspect: "portrait", credit: "Unsplash" },
  { src: unsplash("Qq0Coemj0Ng", 1400), alt: "Sawah hijau dengan Gunung Rinjani di kejauhan", location: "Tetebatu, Lombok", aspect: "landscape", credit: "Unsplash" },
  { src: unsplash("BSq0evBiUNs", 1400), alt: "Dermaga kayu menuju homestay tropis", location: "Raja Ampat", aspect: "square", credit: "Unsplash" },
  { src: unsplash("-EJSdbwW-bE", 1400), alt: "Rombongan pendaki saat sunrise", location: "Sindoro", aspect: "portrait", credit: "Unsplash" },
];
