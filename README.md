# Gaskeun — Demo Website Open Trip

Landing page + halaman detail paket open trip yang animatif, mobile-first, dan siap deploy ke Vercel.
Dibuat sebagai **website demo** (portofolio jasa pembuatan website untuk UMKM travel). Nama brand,
nomor WhatsApp, foto, dan semua data adalah contoh.

**Stack:** Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 · Motion (Framer Motion) · Lenis ·
Embla Carousel · lucide-react · Vitest. Tanpa backend & database — semua halaman di-generate statis.

---

## Menjalankan di lokal

Butuh Node.js **20.9+** (disarankan 22).

```bash
npm install
npm run dev        # http://localhost:3000
```

Perintah lain:

| Perintah          | Fungsi                                       |
| ----------------- | -------------------------------------------- |
| `npm run build`   | Build produksi (cek sebelum deploy)          |
| `npm run start`   | Menjalankan hasil build                      |
| `npm run lint`    | ESLint                                       |
| `npm test`        | Unit test Vitest (format rupiah, kuota, WA)  |

---

## Mengganti konten (`src/content/`)

Semua teks, data trip, dan kontak ada di `src/content/` sebagai data TypeScript bertipe
(lihat `types.ts`). **Komponen tidak menyimpan konten sendiri**, jadi cukup edit file di sini.

| File               | Isi                                                                 |
| ------------------ | ------------------------------------------------------------------- |
| `site.ts`          | Nama brand, **nomor WhatsApp**, email, alamat, sosmed, menu, daftar destinasi marquee |
| `home.ts`          | Copy landing page: hero (headline + slideshow foto), alasan (bento), langkah, statistik, FAQ, CTA |
| `trips.ts`         | Paket open trip (harga, kuota, itinerary, include/exclude, foto, dll) |
| `testimonials.ts`  | Testimoni (ditampilkan sebagai bubble chat)                          |
| `faqs.ts`          | Pertanyaan & jawaban FAQ                                             |
| `gallery.ts`       | Foto galeri + bentuk tile (`portrait` / `landscape` / `square`)      |
| `media.ts`         | Helper URL foto Unsplash (placeholder)                               |

Catatan penting:

- **Nomor WhatsApp**: isi `site.whatsapp.number` dengan format bebas (`0812…`, `+62 812…`) —
  otomatis dinormalisasi ke format `wa.me`.
- **Status kuota otomatis** dari `quota.total`, `quota.booked`, dan tanggal:
  `Open` → `Hampir Penuh` (sisa ≤ 20% kuota, minimal 3 seat) → `Full` (sisa 0) →
  `Selesai` (hari keberangkatan sudah tiba/lewat). Jika `Full`, tombol berubah jadi **Masuk waiting list**.
- **Tanggal trip demo** ditulis sebagai offset hari dari hari ini (`startsInDays`) supaya demo selalu
  terlihat upcoming. Halaman di-regenerate otomatis tiap 24 jam (ISR). Untuk data klien asli, ubah
  `getTrips()` agar mengembalikan `startDate` / `endDate` absolut (`YYYY-MM-DD`).
- **Icon fitur/langkah** disimpan sebagai nama string (`"wallet"`, `"users"`, …) yang dipetakan di
  `src/components/ui/Icon.tsx`.
- **Foto**: cara paling aman, taruh file di `public/images/destinations/` lalu daftarkan di `localPhotos`
  (`src/content/media.ts`). Foto lokal selalu tampil & otomatis dioptimasi `next/image`. Bisa juga pakai URL
  luar; jika host-nya bukan Unsplash, tambahkan domainnya di `images.remotePatterns` pada `next.config.ts`.
  Kalau sebuah foto gagal dimuat, yang tampil adalah gradien warna-warni (fallback), bukan ikon rusak.
- **Video hero (opsional)**: isi `home.hero.backgroundVideo` (`src` + `poster`). Video hanya diputar di
  layar ≥ 768px dan bila user tidak memilih *reduced motion*; HP tetap memakai foto.

### Ganti warna / font / radius (re-branding per klien)

Design tokens ada di blok `@theme` di `src/app/globals.css` (Tailwind v4 membaca konfigurasi dari CSS):
warna (`--color-*`), radius (`--radius-card`), shadow ala stiker (`--shadow-sticker`, `--shadow-pop`),
dan font. Font di-load di `src/app/layout.tsx` via `next/font`.

---

## Struktur folder

```
src/
├── app/                      # Routing (App Router)
│   ├── page.tsx              # Landing page
│   ├── trips/[slug]/         # Detail paket + OG image per trip
│   ├── not-found.tsx         # 404 custom
│   ├── opengraph-image.tsx   # OG image beranda
│   ├── site-chrome.tsx       # Navbar + Footer (ambil konten → props)
│   ├── sitemap.ts, robots.ts, icon.svg, globals.css (design tokens)
├── components/
│   ├── primitives/           # AppImage, AppLink — pembungkus next/image & next/link
│   ├── ui/                   # Button, Accordion, Lightbox, QuotaBar, Marquee, Reveal, ...
│   ├── sections/             # Section landing page (presentational)
│   ├── trip/                 # Kartu & komponen halaman detail trip
│   └── providers/            # Motion & smooth scroll (Lenis)
├── content/                  # SEMUA konten & data demo (bertipe)
├── lib/                      # Util murni + unit test (format, availability, whatsapp, trips)
└── assets/fonts/             # Font untuk OG image
```

---

## Deploy ke Vercel

Tidak butuh environment variable apa pun.

1. Push repo ini ke GitHub.
2. Buka [vercel.com/new](https://vercel.com/new) → **Import** repo tersebut.
3. Framework otomatis terdeteksi **Next.js** → klik **Deploy**.
4. Selesai. URL produksi otomatis dipakai untuk metadata & Open Graph
   (via `VERCEL_PROJECT_PRODUCTION_URL`).

Opsional: set `NEXT_PUBLIC_SITE_URL` (mis. `https://gaskeun.id`) jika memakai domain custom, agar
link di sitemap & Open Graph memakai domain tersebut.

---

## Rencana migrasi ke Laravel + Inertia + React

Arsitektur sudah disiapkan agar mudah dipindah:

- Komponen di `components/sections`, `components/trip`, dan `components/ui` **presentational** — semua data
  lewat props. Di Inertia, controller Laravel cukup mengirim data dengan bentuk yang sama (`types.ts`).
- Tidak ada API khusus Next.js di dalam komponen section. Hanya `components/primitives/AppImage.tsx` dan
  `AppLink.tsx` yang memakai `next/image` & `next/link` — ganti dua file ini saja.
- Lazy-load memakai `React.lazy` (bukan `next/dynamic`).
- Logika bisnis (status kuota, link WA, format rupiah) ada di `src/lib/` sebagai fungsi murni + test.

## Lisensi foto

Foto di `public/images/destinations/` dan foto Unsplash adalah **placeholder untuk demo**. Ganti dengan
foto asli milik klien (atau pastikan lisensinya) sebelum dipakai secara komersial.
