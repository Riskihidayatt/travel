import { localPhotos } from "./media";
import type { GalleryPhoto } from "./types";

/** Foto galeri (foto lokal di public/images/destinations). `aspect` menentukan bentuk tile di masonry. */
export const gallery: GalleryPhoto[] = [
  { ...localPhotos.padar, location: "Padar, Labuan Bajo", aspect: "landscape" },
  { ...localPhotos.bromo, location: "Bromo", aspect: "landscape" },
  { ...localPhotos.kelingking, location: "Nusa Penida", aspect: "square" },
  { ...localPhotos.piaynemo, location: "Raja Ampat", aspect: "landscape" },
  { ...localPhotos.rinjani, location: "Segara Anak, Rinjani", aspect: "landscape" },
  { ...localPhotos.toraja, location: "Toraja", aspect: "square" },
  { ...localPhotos.sumba, location: "Savana Sumba", aspect: "portrait" },
  { ...localPhotos.phinisi, location: "Sailing Komodo", aspect: "landscape" },
  { ...localPhotos.airTerjun, location: "Air terjun, Lombok", aspect: "portrait" },
  { ...localPhotos.pulauCottage, location: "Island escape", aspect: "landscape" },
  { ...localPhotos.wayag, location: "Wayag, Raja Ampat", aspect: "square" },
  { ...localPhotos.sindoro, location: "Sunrise Sindoro", aspect: "portrait" },
];
