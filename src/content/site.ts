import type { SiteConfig } from "./types";

/** Identitas brand & kontak. Ganti per klien. */
export const site: SiteConfig = {
  name: "Gaskeun",
  handle: "gaskeun.trip",
  tagline: "Open trip seru bareng circle baru",
  description:
    "Gaskeun adalah open trip buat anak muda: Bromo, Labuan Bajo, Nusa Penida, Rinjani, sampai Raja Ampat. Harga transparan, trip leader asik, daftar cukup lewat WhatsApp.",
  whatsapp: {
    // PLACEHOLDER — ganti dengan nomor admin asli.
    number: "6281234567890",
    display: "0812-3456-7890",
    defaultMessage: "Halo Gaskeun! Aku mau tanya-tanya soal open trip dong.",
  },
  email: "halo@gaskeun.trip",
  address: "Jl. Kaliurang Km 5, Sleman, DI Yogyakarta",
  operatingHours: "Setiap hari, 08.00–22.00 WIB",
  social: {
    instagram: "https://instagram.com/gaskeun.trip",
    tiktok: "https://tiktok.com/@gaskeun.trip",
    youtube: "https://youtube.com/@gaskeun.trip",
  },
  nav: [
    { label: "Open Trip", href: "/#trips" },
    { label: "Kenapa Kami", href: "/#kenapa" },
    { label: "Cara Ikut", href: "/#cara-ikut" },
    { label: "Galeri", href: "/#galeri" },
    { label: "FAQ", href: "/#faq" },
  ],
  destinations: [
    "Bromo",
    "Labuan Bajo",
    "Nusa Penida",
    "Rinjani",
    "Raja Ampat",
    "Toraja",
    "Sumba",
    "Karimunjawa",
    "Dieng",
    "Ijen",
    "Belitung",
    "Sindoro",
  ],
};
