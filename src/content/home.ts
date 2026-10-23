import { unsplash } from "./media";
import type { HomeContent } from "./types";

/** Semua copy landing page. */
export const home: HomeContent = {
  hero: {
    eyebrow: "Open trip ke 36+ destinasi Indonesia",
    headlineLead: "Jelajah",
    headlineHighlight: "Indonesia",
    headlineTail: "bareng circle baru.",
    subheadline:
      "Dari sunrise di Bromo sampai sailing di Labuan Bajo. Daftar sendiri, pulang bawa teman, semua urusan ribet kami yang beresin.",
    primaryCta: { label: "Lihat Paket", href: "#trips" },
    secondaryCtaLabel: "Chat Admin",
    slides: [
      { src: unsplash("TG50QzQzZm0", 2400), alt: "Perbukitan Pulau Padar dengan teluk biru", location: "Padar, Labuan Bajo", credit: "Unsplash" },
      { src: unsplash("oOewK0KGXtI", 2400), alt: "Tebing Kelingking Beach di Nusa Penida", location: "Nusa Penida, Bali", credit: "Unsplash" },
      { src: unsplash("4tMHO3NbUEc", 2400), alt: "Gugusan pulau karst Piaynemo dari udara", location: "Piaynemo, Raja Ampat", credit: "Unsplash" },
      { src: unsplash("-EJSdbwW-bE", 2400), alt: "Rombongan pendaki saat matahari terbit", location: "Sindoro, Jawa Tengah", credit: "Unsplash" },
      { src: unsplash("CD4nKcF6n40", 2400), alt: "Rumah tongkonan di tengah hutan Toraja", location: "Tana Toraja, Sulawesi", credit: "Unsplash" },
      { src: unsplash("LjUpw15tBaY", 2400), alt: "Kaldera Bromo diselimuti abu vulkanik", location: "Bromo, Jawa Timur", credit: "Unsplash" },
    ],
    // Opsional: isi untuk memakai video di desktop. Poster wajib diisi.
    // backgroundVideo: { src: "/media/hero.mp4", poster: unsplash("TG50QzQzZm0", 1600) },
    stickerText: "open trip • solo welcome • gaskeun • ",
  },
  trips: {
    eyebrow: "Jadwal terdekat",
    title: "Open trip yang siap kamu gas",
    description: "Seat terbatas, first come first serve. Klik kartunya buat lihat itinerary lengkap.",
  },
  why: {
    eyebrow: "Kenapa trip bareng kami",
    title: "Liburan tanpa drama, cuma cerita seru",
  },
  features: [
    {
      icon: "users",
      title: "Solo traveler? Justru itu intinya.",
      description:
        "70% peserta kami daftar sendirian. Ada ice breaking, grup WA sebelum berangkat, dan trip leader yang jago bikin suasana cair.",
      tone: "lime",
      size: "hero",
    },
    {
      icon: "wallet",
      title: "Harga jujur, no hidden fee",
      description: "Yang ditulis, itu yang dibayar. Bisa DP 30% dulu.",
      tone: "tangerine",
      size: "base",
    },
    {
      icon: "shield-check",
      title: "Aman & berasuransi",
      description: "Semua peserta ter-cover asuransi perjalanan.",
      tone: "sky",
      size: "base",
    },
    {
      icon: "camera",
      title: "Dokumentasi niat",
      description: "Fotografer + drone di setiap trip. Kamu tinggal pose.",
      tone: "cream",
      size: "tall",
      image: {
        src: unsplash("tqvF1JXzOxs", 1200),
        alt: "Bukit Pulau Padar di samping laut biru",
        credit: "Unsplash",
      },
    },
    {
      icon: "badge-check",
      title: "Trip leader bersertifikat",
      description: "P3K, navigasi, dan sabar ngadepin yang telat bangun.",
      tone: "lilac",
      size: "wide",
    },
    {
      icon: "headphones",
      title: "Admin fast response",
      description: "Balas chat setiap hari 08.00–22.00.",
      tone: "bubblegum",
      size: "base",
    },
    {
      icon: "route",
      title: "Itinerary anti-mainstream",
      description: "Hidden gem + jam main yang pas biar foto dapet golden hour.",
      tone: "cream",
      size: "base",
    },
  ],
  how: {
    eyebrow: "Cara ikut open trip",
    title: "Empat langkah, langsung berangkat",
  },
  steps: [
    {
      icon: "compass",
      title: "Pilih trip",
      description: "Scroll jadwal, cek tanggal & sisa seat, terus klik trip yang bikin kamu deg-degan.",
    },
    {
      icon: "message-circle",
      title: "Chat admin",
      description: "Klik tombol WhatsApp, pesan otomatis udah kami siapin. Tinggal kirim.",
    },
    {
      icon: "ticket",
      title: "Bayar DP & masuk grup",
      description: "DP 30% buat amankan seat. Kamu langsung masuk grup WA peserta.",
    },
    {
      icon: "backpack",
      title: "Gaskeun!",
      description: "Packing sesuai checklist, datang ke meeting point, dan nikmati tripnya.",
    },
  ],
  stats: {
    eyebrow: "Angka nggak bohong",
    title: "Udah ribuan orang kabur bareng kami",
  },
  statItems: [
    { value: 12500, suffix: "+", label: "Peserta", caption: "dari 34 kota" },
    { value: 480, suffix: "+", label: "Trip jalan", caption: "sejak 2019" },
    { value: 4.9, decimals: 1, suffix: "/5", label: "Rating", caption: "dari 2.300+ ulasan" },
    { value: 36, label: "Destinasi", caption: "dan terus nambah" },
  ],
  testimonials: {
    eyebrow: "Kata mereka",
    title: "Langsung dari DM kami",
  },
  gallery: {
    eyebrow: "Galeri",
    title: "Bukti kalau ini bukan cuma janji",
    description: "Klik fotonya buat lihat lebih besar.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Yang sering ditanyain",
    description: "Belum ketemu jawabannya? Admin kami siap jawab, nggak pakai lama.",
    ctaLabel: "Tanya admin",
  },
  closing: {
    eyebrow: "Tunggu apa lagi?",
    title: "Kapan lagi kalau bukan sekarang?",
    description: "Seat trip bulan depan cepet banget habis. Amankan punyamu sebelum keduluan.",
    primaryLabel: "Chat admin sekarang",
    secondaryCta: { label: "Lihat jadwal trip", href: "#trips" },
  },
};
