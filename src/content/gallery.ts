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
  { ...localPhotos.rinjani, location: "Segara Anak, Rinjani", aspect: "landscape" },
  { ...localPhotos.toraja, location: "Toraja", aspect: "square" },
  { ...localPhotos.sumba, location: "Savana Sumba", aspect: "portrait" },
  { ...localPhotos.phinisi, location: "Sailing Komodo", aspect: "landscape" },
  { src: unsplash("HKTDt5nK_a4", 1400), alt: "Pohon kelapa berjajar di Karimunjawa", location: "Karimunjawa", aspect: "portrait", credit: "Unsplash" },
  { src: unsplash("Qq0Coemj0Ng", 1400), alt: "Sawah hijau dengan Gunung Rinjani di kejauhan", location: "Tetebatu, Lombok", aspect: "landscape", credit: "Unsplash" },
  { src: unsplash("BSq0evBiUNs", 1400), alt: "Dermaga kayu menuju homestay tropis", location: "Raja Ampat", aspect: "square", credit: "Unsplash" },
  { ...localPhotos.sindoro, location: "Sunrise Sindoro", aspect: "portrait" },
];
