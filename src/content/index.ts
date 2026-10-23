/**
 * Pintu masuk konten. Komponen TIDAK boleh import dari sini secara langsung;
 * halaman (route) yang mengambil data lalu mengoper lewat props.
 * Saat pindah ke Laravel + Inertia, data ini dikirim controller sebagai props.
 */
export { site } from "./site";
export { home } from "./home";
export { getTrips } from "./trips";
export { testimonials } from "./testimonials";
export { faqs } from "./faqs";
export { gallery } from "./gallery";
export type * from "./types";
