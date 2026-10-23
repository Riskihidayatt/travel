/**
 * Tipe konten. Semua data di `src/content/` memakai tipe ini supaya nanti mudah
 * dipindah ke CMS / database (Laravel + Inertia) tanpa mengubah komponen.
 * Semua field bernilai primitif / serializable (aman dikirim sebagai props).
 */

/** Nama icon yang tersedia di `components/ui/Icon.tsx` (dipetakan ke lucide-react). */
export type IconName =
  | "shield-check"
  | "wallet"
  | "users"
  | "camera"
  | "badge-check"
  | "hand-heart"
  | "map"
  | "message-circle"
  | "ticket"
  | "backpack"
  | "sunrise"
  | "compass"
  | "headphones"
  | "sparkles"
  | "route"
  | "zap";

export interface Photo {
  src: string;
  alt: string;
  /** Kredit fotografer / sumber (wajib diisi untuk foto stok). */
  credit?: string;
}

export type TripCategory = "gunung" | "sailing" | "pulau" | "budaya";

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface MeetingPoint {
  name: string;
  address: string;
  time: string;
  mapsUrl?: string;
}

export interface Trip {
  slug: string;
  title: string;
  destination: string;
  category: TripCategory;
  /** Kalimat pendek untuk kartu & meta description. */
  tagline: string;
  description: string;
  coverImage: Photo;
  gallery: Photo[];
  /** Format ISO `YYYY-MM-DD`. */
  startDate: string;
  endDate: string;
  /** Contoh: "3D2N". */
  durationLabel: string;
  meetingPoint: MeetingPoint;
  price: number;
  originalPrice?: number;
  quota: { total: number; booked: number };
  highlights: string[];
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  tags: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  /** Kota asal, ditampilkan kecil di header kartu. */
  city: string;
  tripTitle: string;
  rating: number;
  /** Ditampilkan sebagai bubble chat berurutan. */
  messages: string[];
  /** Balasan admin (opsional). */
  reply?: string;
  /** Warna avatar inisial. */
  tone: Tone;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface GalleryPhoto extends Photo {
  location: string;
  aspect: "portrait" | "landscape" | "square";
}

export type Tone = "lime" | "tangerine" | "lilac" | "sky" | "bubblegum" | "cream";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLinks {
  instagram: string;
  tiktok: string;
  youtube?: string;
}

export interface SiteConfig {
  name: string;
  /** Domain/handle yang tampil di logo, contoh "gaskeun.trip". */
  handle: string;
  tagline: string;
  description: string;
  whatsapp: { number: string; display: string; defaultMessage: string };
  email: string;
  address: string;
  operatingHours: string;
  social: SocialLinks;
  nav: NavItem[];
  /** Muncul di marquee destinasi. */
  destinations: string[];
}

export interface Cta {
  label: string;
  href: string;
}

export interface HeroSlide extends Photo {
  /** Label lokasi yang tampil di pojok hero. */
  location: string;
}

export interface HeroContent {
  eyebrow: string;
  /** Headline = lead + highlight (stiker) + tail. Muncul per kata. */
  headlineLead: string;
  headlineHighlight: string;
  headlineTail: string;
  subheadline: string;
  primaryCta: Cta;
  secondaryCtaLabel: string;
  /** Slideshow background multi-destinasi. Slide pertama = gambar LCP. */
  slides: HeroSlide[];
  /** Opsional. Diputar hanya di desktop & bila user tidak memilih reduced motion. */
  backgroundVideo?: { src: string; poster: string };
  /** Teks pada stiker berputar. */
  stickerText: string;
}

export interface SectionCopy {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface Feature {
  icon: IconName;
  title: string;
  description: string;
  tone: Tone;
  /** Ukuran tile bento. */
  size: "hero" | "wide" | "tall" | "base";
  /** Foto latar tile. Lebih dari 1 foto = slideshow otomatis. */
  images?: Photo[];
}

export interface Step {
  icon: IconName;
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  caption: string;
}

export interface ClosingCtaContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryCta: Cta;
}

export interface HomeContent {
  hero: HeroContent;
  trips: SectionCopy;
  why: SectionCopy;
  features: Feature[];
  how: SectionCopy;
  steps: Step[];
  stats: SectionCopy;
  statItems: Stat[];
  testimonials: SectionCopy;
  gallery: SectionCopy;
  faq: SectionCopy & { ctaLabel: string };
  closing: ClosingCtaContent;
}
