import { describe, expect, it } from "vitest";
import { buildTripMessage, buildWhatsAppLink, getTripCtaLabel, normalizeWhatsAppNumber } from "./whatsapp";

describe("normalizeWhatsAppNumber", () => {
  it("mengubah awalan 0 menjadi 62", () => {
    expect(normalizeWhatsAppNumber("0812-3456-7890")).toBe("6281234567890");
  });

  it("menghapus +, spasi, dan tanda kurung", () => {
    expect(normalizeWhatsAppNumber("+62 (812) 3456 7890")).toBe("6281234567890");
  });

  it("menambah 62 untuk nomor yang diawali 8", () => {
    expect(normalizeWhatsAppNumber("81234567890")).toBe("6281234567890");
  });
});

describe("buildWhatsAppLink", () => {
  it("membuat link wa.me dengan pesan ter-encode", () => {
    const link = buildWhatsAppLink("081234567890", "Halo! Mau daftar *Bromo* 7–8 Nov & tanya harga?");
    expect(link.startsWith("https://wa.me/6281234567890?text=")).toBe(true);
    const text = new URL(link).searchParams.get("text");
    expect(text).toBe("Halo! Mau daftar *Bromo* 7–8 Nov & tanya harga?");
    expect(link).not.toContain(" ");
    expect(link).toContain("%26");
  });

  it("tanpa pesan menghasilkan link polos", () => {
    expect(buildWhatsAppLink("6281234567890")).toBe("https://wa.me/6281234567890");
    expect(buildWhatsAppLink("6281234567890", "   ")).toBe("https://wa.me/6281234567890");
  });

  it("melempar error untuk nomor kosong", () => {
    expect(() => buildWhatsAppLink("abc")).toThrow();
  });
});

describe("buildTripMessage", () => {
  const base = { brandName: "Gaskeun", tripTitle: "Bromo Midnight Sunrise", dateLabel: "3–4 Nov 2026" };

  it("pesan daftar berisi nama trip dan tanggal", () => {
    const msg = buildTripMessage({ ...base, status: "open" });
    expect(msg).toContain("Bromo Midnight Sunrise");
    expect(msg).toContain("3–4 Nov 2026");
    expect(msg).toContain("daftar");
  });

  it("pesan waiting list saat Full", () => {
    const msg = buildTripMessage({ ...base, status: "full" });
    expect(msg).toContain("waiting list");
    expect(msg).toContain("3–4 Nov 2026");
  });

  it("pesan jadwal berikutnya saat Selesai", () => {
    expect(buildTripMessage({ ...base, status: "finished" })).toContain("jadwal berikutnya");
  });
});

describe("getTripCtaLabel", () => {
  it("label tombol mengikuti status", () => {
    expect(getTripCtaLabel("open")).toBe("Daftar via WhatsApp");
    expect(getTripCtaLabel("almost-full")).toBe("Daftar via WhatsApp");
    expect(getTripCtaLabel("full")).toBe("Masuk waiting list");
    expect(getTripCtaLabel("finished")).toBe("Tanya jadwal berikutnya");
  });
});
