import { localPhotos } from "./media";
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
    // Slide pertama = gambar LCP → pakai foto beresolusi paling tinggi.
    slides: [
      { ...localPhotos.kelingking, location: "Kelingking, Nusa Penida" },
      { ...localPhotos.padar, location: "Padar, Labuan Bajo" },
      { ...localPhotos.piaynemo, location: "Piaynemo, Raja Ampat" },
      { ...localPhotos.bromo, location: "Bromo, Jawa Timur" },
      { ...localPhotos.toraja, location: "Kete Kesu, Toraja" },
      { ...localPhotos.rinjani, location: "Segara Anak, Rinjani" },
      { ...localPhotos.sindoro, location: "Sunrise Sindoro, Jawa Tengah" },
      { ...localPhotos.sumba, location: "Savana Sumba" },
    ],
    // Opsional: isi untuk memakai video di desktop. Poster wajib diisi.
    // backgroundVideo: { src: "/media/hero.mp4", poster: localPhotos.kelingking.src },
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
      images: [
        { ...localPhotos.phinisi },
        { ...localPhotos.sindoro },
        { ...localPhotos.piaynemo },
        { ...localPhotos.kelingking },
        { ...localPhotos.padar },
      ],
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
