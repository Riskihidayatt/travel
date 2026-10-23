import { describe, expect, it } from "vitest";
import { formatDate, formatDateRange, formatNumber, formatRupiah } from "./format";

describe("formatRupiah", () => {
  it("memformat angka dengan pemisah ribuan titik", () => {
    expect(formatRupiah(1_250_000)).toBe("Rp1.250.000");
    expect(formatRupiah(650_000)).toBe("Rp650.000");
  });

  it("menangani nol, angka kecil, dan pembulatan", () => {
    expect(formatRupiah(0)).toBe("Rp0");
    expect(formatRupiah(999)).toBe("Rp999");
    expect(formatRupiah(1499.6)).toBe("Rp1.500");
  });

  it("menangani angka negatif dan nilai tidak valid", () => {
    expect(formatRupiah(-50_000)).toBe("-Rp50.000");
    expect(formatRupiah(Number.NaN)).toBe("Rp0");
    expect(formatRupiah(Number.POSITIVE_INFINITY)).toBe("Rp0");
  });

  it("mendukung format ringkas", () => {
    expect(formatRupiah(3_450_000, { compact: true })).toBe("Rp3,45 jt");
    expect(formatRupiah(8_900_000, { compact: true })).toBe("Rp8,9 jt");
    expect(formatRupiah(650_000, { compact: true })).toBe("Rp650 rb");
    expect(formatRupiah(500, { compact: true })).toBe("Rp500");
  });
});

describe("formatNumber", () => {
  it("memakai locale Indonesia", () => {
    expect(formatNumber(12_500)).toBe("12.500");
    expect(formatNumber(4.9, 1)).toBe("4,9");
  });
});

describe("formatDate & formatDateRange", () => {
  it("format tanggal tunggal", () => {
    expect(formatDate("2026-11-07")).toBe("7 Nov 2026");
    expect(formatDate("2026-11-07", { withYear: false })).toBe("7 Nov");
  });

  it("rentang di bulan yang sama", () => {
    expect(formatDateRange("2026-11-07", "2026-11-09")).toBe("7–9 Nov 2026");
  });

  it("rentang lintas bulan dan lintas tahun", () => {
    expect(formatDateRange("2026-11-30", "2026-12-02")).toBe("30 Nov – 2 Des 2026");
    expect(formatDateRange("2026-12-30", "2027-01-02")).toBe("30 Des 2026 – 2 Jan 2027");
  });

  it("rentang satu hari", () => {
    expect(formatDateRange("2026-11-07", "2026-11-07")).toBe("7 Nov 2026");
  });
});
