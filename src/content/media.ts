/**
 * Helper URL foto Unsplash (PLACEHOLDER untuk demo).
 *
 * Memakai endpoint `unsplash.com/photos/<id>/download?w=...` yang me-redirect ke
 * file di `images.unsplash.com`. `next/image` mengikuti redirect ini lalu
 * mengoptimasi & meng-cache hasilnya, jadi pengunjung tetap dapat AVIF/WebP kecil.
 *
 * Saat versi klien jadi: ganti dengan foto asli (upload ke CMS / storage).
 */
export function unsplash(id: string, width = 1600): string {
  return `https://unsplash.com/photos/${id}/download?w=${width}`;
}

/**
 * Foto lokal di `public/images/destinations/` (dari user, dipakai untuk demo).
 * Selalu tampil karena tidak bergantung pada layanan luar.
 */
export const localPhotos = {
  bromo: {
    src: "/images/destinations/bromo.jpg",
    alt: "Gunung Bromo dan Semeru menyembul dari lautan kabut di pagi hari",
  },
  padar: {
    src: "/images/destinations/padar.jpg",
    alt: "Perbukitan Pulau Padar dan teluk-teluknya saat senja",
  },
  kelingking: {
    src: "/images/destinations/kelingking.jpg",
    alt: "Tebing Kelingking Beach di Nusa Penida dilihat dari udara",
  },
  piaynemo: {
    src: "/images/destinations/piaynemo.jpg",
    alt: "Gugusan pulau karst Piaynemo dilihat dari dek viewpoint",
  },
  toraja: {
    src: "/images/destinations/toraja.jpg",
    alt: "Deretan rumah adat tongkonan di Kete Kesu, Toraja",
  },
  sindoro: {
    src: "/images/destinations/sindoro-sunrise.jpg",
    alt: "Rombongan pendaki menikmati sunrise di atas lautan awan dengan Gunung Sindoro di kejauhan",
  },
  phinisi: {
    src: "/images/destinations/phinisi-komodo.jpg",
    alt: "Kapal phinisi berlayar di perairan Taman Nasional Komodo dengan peserta di dek",
  },
  rinjani: {
    src: "/images/destinations/rinjani.jpg",
    alt: "Danau Segara Anak dan Gunung Barujari di kaldera Rinjani",
  },
  sumba: {
    src: "/images/destinations/sumba.jpg",
    alt: "Kuda-kuda merumput di padang savana Sumba yang keemasan",
  },
} as const;

export type LocalPhotoKey = keyof typeof localPhotos;
