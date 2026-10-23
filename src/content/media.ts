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
