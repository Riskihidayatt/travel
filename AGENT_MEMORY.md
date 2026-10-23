# AGENT MEMORY — Gaskeun (demo website open trip)

> File ini WAJIB dibaca AI agent di awal sesi kerja, dan WAJIB diupdate di akhir sesi setelah fitur selesai+ditest.
> Terakhir diupdate: 2026-10-23 oleh sesi: pembuatan awal landing page + detail trip + redesign hero.

## 1. Ringkasan Project
- Website **DEMO** open trip untuk portofolio/marketing jasa pembuatan website (calon klien: UMKM travel).
- Brand fiktif: **Gaskeun** (`gaskeun.trip`). Target: Gen Z 18–28, mayoritas buka dari HP via link IG/TikTok.
- Alur bisnis: lihat paket → detail → daftar via WhatsApp (link `wa.me` dengan pesan otomatis).
- Stack: Next.js 16.4 (App Router, Turbopack) · TypeScript strict · Tailwind CSS v4 · `motion` (Framer Motion, import dari `motion/react`) · `lenis` · `embla-carousel-react` (+ autoplay) · `lucide-react` v1 · Vitest 5.
- Tanpa backend/DB. Semua route statis (SSG) + ISR `revalidate = 86400`.
- Repo tunggal, kode di `src/`. Lihat README untuk struktur folder.

## 2. Keputusan Arsitektur (jangan diubah tanpa diskusi eksplisit)
- **Konten hanya di `src/content/`** (data TS bertipe, `types.ts`). Komponen presentational, data lewat props. Route (`src/app/*`) yang import konten. Alasan: nanti dipindah ke Laravel + Inertia + CMS.
- **Next-specific API hanya di `components/primitives/AppImage.tsx` & `AppLink.tsx`** (+ file di `src/app/`). Komponen section/ui/trip TIDAK boleh import `next/*`. Lazy-load pakai `React.lazy`, bukan `next/dynamic`.
- **`cacheComponents` DIMATIKAN** (default create-next-app 16.4 menyalakannya). Alasan: brief minta struktur standar; `new Date()` di server component (tanggal relatif demo) bentrok dengan Cache Components. Pakai ISR klasik (`export const revalidate`).
- **Tanggal**: string ISO `YYYY-MM-DD`, "hari ini" dihitung di zona `Asia/Jakarta` (`lib/dates.ts`). Status/sisa seat dihitung di SERVER (`lib/trips.ts → TripView`) lalu dikirim sebagai props → tidak ada `Date` di client → tidak ada hydration mismatch.
- **Status kuota** (`lib/availability.ts`): Selesai jika hari ini >= startDate; Full jika sisa 0; Hampir Penuh jika sisa <= max(3, ceil(20% total)); selain itu Open.
- **Foto** pakai `https://unsplash.com/photos/<id>/download?w=...` (redirect ke images.unsplash.com; next/image mengikuti redirect, `maximumRedirects` default 3). Dipilih karena ID `images.unsplash.com/photo-...` tidak bisa diverifikasi dari sandbox. `AppImage` punya fallback gradien jika gambar gagal (termasuk gagal sebelum hydration).
- **Motion**: `LazyMotion` + `m.*` + `strict`, fitur `domMax` dimuat ASYNC (`providers/motion-features.ts`). Ini menaikkan Lighthouse perf 66 → ~90. Jangan import `motion` (non-`m`) di komponen — strict mode akan error.
- **Animasi hanya transform & opacity.** Hero headline pakai CSS animation (`.word-reveal`, `.fade-up` di globals.css) agar tampil tanpa menunggu JS.
- **Reduced motion**: MotionConfig `reducedMotion="user"`, CSS global mematikan animasi, Lenis tidak aktif (juga tidak aktif di perangkat sentuh), autoplay testimoni/slideshow hero/ticker berhenti, parallax mati.
- **Teks dekoratif besar** (wordmark footer, marquee di Stats) dirender lewat `before:content-[attr(data-text)]` supaya tidak ikut audit kontras/screen reader.

## 3. Konvensi yang harus diikuti
- Icon: **lucide-react** saja; DILARANG emoji sebagai icon UI. Logo brand (WA/IG/TikTok/YouTube) ada di `components/ui/BrandIcons.tsx` (lucide v1 tidak punya brand icon). Icon dari konten disimpan sebagai string `IconName` → `components/ui/Icon.tsx`.
- Design tokens di `@theme` pada `src/app/globals.css` (warna, radius, shadow, breakpoint `xs` = 25rem, animasi). Breakpoint ekstra WAJIB didefinisikan sebagai `--breakpoint-*` (bukan `@custom-variant`) agar urutan media query benar.
- Kontras: `tangerine` (#ff5b1f) hanya sebagai background dengan teks ink, atau teks di atas ink. Untuk teks oranye di atas cream pakai `text-tangerine-deep`.
- Tombol: `components/ui/Button.tsx` (`ButtonLink` / `Button`), gaya stiker dengan bayangan solid.
- Link eksternal otomatis `target=_blank rel=noopener` via `AppLink`.
- Global route types (`PageProps`, `LayoutProps`) dibuat oleh `next typegen`/`next build`.

## 4. Status Fitur
| Fitur | Status | Catatan |
|---|---|---|
| Landing page 12 section | Done | Navbar hide-on-scroll + menu fullscreen, hero slideshow multi-destinasi + ticker jadwal, marquee, kartu trip (filter kategori, tilt, quota bar), bento, timeline scroll, counter, testimoni Embla, galeri masonry + lightbox lazy, FAQ accordion, CTA, footer, WA melayang |
| Detail trip `/trips/[slug]` | Done | Galeri hero + lightbox, highlights, itinerary accordion timeline, include/exclude, meeting point, related, sidebar sticky (desktop) / bottom bar (mobile), CTA WA sesuai status (Full → waiting list), JSON-LD TouristTrip, metadata + OG image dinamis |
| 404 custom | Done | `app/not-found.tsx` + `sections/NotFoundView.tsx` |
| SEO | Done | sitemap, robots, metadataBase otomatis (Vercel), OG image beranda & per trip (font dari `src/assets/fonts`, foto di-fetch dengan fallback gradien) |
| Unit test | Done | 37 test: format, availability, whatsapp, dates, trips selectors |
| Lighthouse (lokal, mobile) | Perf ~89–91, A11y 100, SEO 100, BP 96 | BP turun hanya karena gambar Unsplash diblokir sandbox (500 di console). Belum diukur di Vercel dengan foto asli. |

## 5. Sesi ini
- Sudah: seluruh project dibangun dari nol, lint/test/build lolos, screenshot dicek 360px & 1440px.
- Redesign hero atas masukan user: sebelumnya terasa "Bromo-sentris" (rotating word mulai "ke Bromo" + chip next trip Bromo). Sekarang headline "Jelajah **Indonesia** bareng circle baru.", background slideshow 6 destinasi + label lokasi, chip "Next trip/Jadwal terdekat" bergilir 5 trip bookable.
- Belum: verifikasi visual dengan foto asli (sandbox tidak bisa akses Unsplash).

- User sempat minta ganti palet ke "Ocean & Sunset" (teal + coral) lalu MEMBATALKAN: desain awal (tangerine/lime/stiker) dipertahankan. Jangan ubah palet tanpa diminta. "Rainbow" yang dilihat user adalah fallback gradien foto yang gagal dimuat di sandbox.
- Tile bento "Dokumentasi niat" = slideshow crossfade (`ui/FadeSlideshow.tsx`, field `Feature.images[]`; >1 foto = berganti otomatis, hanya jalan saat terlihat, diam saat reduced motion). Bug lama diperbaiki: judul tile berfoto tadinya gelap di atas foto gelap (bentrok `text-ink` dari tone vs `text-cream`) → tile berfoto kini selalu `bg-ink text-cream`.
- User mengirim 9 foto destinasi (2 batch) → dipasang sebagai foto lokal; sekarang semua cover trip & slide hero pakai foto lokal.

## 6. Known issues / hutang teknis
- **Foto lokal dari user** di `public/images/destinations/` (12 file: bromo, padar, kelingking, piaynemo, toraja, sindoro-sunrise, phinisi-komodo, rinjani, sumba, air-terjun-lombok, pulau-cottage, wayag) — dipakai untuk SEMUA cover & galeri trip, section Galeri, dan tile bento. Sumber/lisensi belum diketahui → cukup untuk demo, WAJIB diganti/dicek haknya sebelum dipakai komersial. Resolusi kecil (±550–1000px, kecuali kelingking 1600px).
- **Raja Ampat** memakai foto Wayag dari user (cover, galeri pertama, slide hero) atas permintaan user.
- **Banner hero = HD Unsplash (2400px) + fallback lokal**: tiap slide punya `src` Unsplash dan `fallbackSrc` foto lokal (fitur `fallbackSrc` di `AppImage`: src gagal → coba fallback → baru gradien). Di sandbox Unsplash diblokir dan fallback terbukti jalan; di Vercel belum terverifikasi apakah versi HD tampil. Slide Raja Ampat sengaja lokal saja. Solusi terbaik: minta foto HD (≥1920px) dari user/klien lalu pakai lokal.
- Gradien warna-warni = fallback foto yang gagal dimuat, bukan desain.
- OG image membaca foto lokal (path "/...") langsung dari folder `public/`.
- Nomor WA `6281234567890` dan semua data (testimoni, statistik, alamat, sosmed) FIKTIF.
- Video hero belum ada (opsional, field `backgroundVideo`).
- Galeri trip Toraja & Sumba hanya 1 foto.
- Accordion: tinggi panel tidak dianimasikan (sesuai aturan transform/opacity saja) → sedikit "loncat".

## 7. TODO / catatan untuk agent berikutnya
- [ ] Ganti nama brand final, logo, dan nomor WhatsApp admin (`src/content/site.ts`).
- [ ] Ganti semua foto dengan foto asli klien (`src/content/*`). Cara termudah: taruh file di `public/images/...` lalu daftarkan di `localPhotos` (`src/content/media.ts`). Untuk host luar, update `next.config.ts` remotePatterns.
- [ ] Minta foto HD (≥1920px) untuk banner hero agar tidak bergantung pada Unsplash.
- [ ] Isi galeri detail tiap trip dengan foto asli destinasi tersebut (sekarang pinjam foto destinasi lain).
- [ ] Isi data trip, testimoni, statistik asli.
- [ ] Cek Lighthouse di URL Vercel produksi.
- [ ] (Masa depan, JANGAN dikerjakan tanpa diminta) Migrasi ke Laravel + Inertia + React + CMS: ganti `AppImage`/`AppLink`, kirim data dari controller dengan bentuk `content/types.ts`.
- Env var: tidak ada yang wajib. Opsional `NEXT_PUBLIC_SITE_URL`.
