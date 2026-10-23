import { describe, expect, it } from "vitest";
import { getAlmostFullThreshold, getAvailability, getSeatsLeft } from "./availability";

const today = "2026-10-23";
const future = "2026-11-10";

describe("getSeatsLeft", () => {
  it("menghitung sisa kuota", () => {
    expect(getSeatsLeft({ total: 14, booked: 12 })).toBe(2);
  });

  it("tidak pernah negatif walau overbooked", () => {
    expect(getSeatsLeft({ total: 10, booked: 12 })).toBe(0);
  });
});

describe("getAlmostFullThreshold", () => {
  it("minimal 3 seat untuk kuota kecil", () => {
    expect(getAlmostFullThreshold(10)).toBe(3);
  });

  it("20% untuk kuota besar (dibulatkan ke atas)", () => {
    expect(getAlmostFullThreshold(30)).toBe(6);
    expect(getAlmostFullThreshold(16)).toBe(4);
  });
});

describe("getAvailability", () => {
  it("Open saat sisa seat masih banyak", () => {
    const a = getAvailability({ quota: { total: 20, booked: 5 }, startDate: future, today });
    expect(a.status).toBe("open");
    expect(a.label).toBe("Open");
    expect(a.seatsLeft).toBe(15);
    expect(a.isBookable).toBe(true);
    expect(a.filledRatio).toBeCloseTo(0.25);
  });

  it("Hampir Penuh saat sisa seat di bawah ambang", () => {
    const a = getAvailability({ quota: { total: 14, booked: 12 }, startDate: future, today });
    expect(a.status).toBe("almost-full");
    expect(a.label).toBe("Hampir Penuh");
    expect(a.isBookable).toBe(true);
  });

  it("tepat di ambang dihitung Hampir Penuh", () => {
    const a = getAvailability({ quota: { total: 14, booked: 11 }, startDate: future, today });
    expect(a.seatsLeft).toBe(3);
    expect(a.status).toBe("almost-full");
  });

  it("Full saat kuota habis", () => {
    const a = getAvailability({ quota: { total: 12, booked: 12 }, startDate: future, today });
    expect(a.status).toBe("full");
    expect(a.isBookable).toBe(false);
    expect(a.filledRatio).toBe(1);
  });

  it("Selesai saat tanggal berangkat sudah lewat, walau masih ada seat", () => {
    const a = getAvailability({ quota: { total: 12, booked: 3 }, startDate: "2026-10-10", today });
    expect(a.status).toBe("finished");
    expect(a.label).toBe("Selesai");
    expect(a.isBookable).toBe(false);
    expect(a.daysUntilDeparture).toBe(-13);
  });

  it("Selesai (pendaftaran ditutup) di hari keberangkatan", () => {
    const a = getAvailability({ quota: { total: 12, booked: 3 }, startDate: today, today });
    expect(a.status).toBe("finished");
  });

  it("H-1 masih bisa daftar", () => {
    const a = getAvailability({ quota: { total: 12, booked: 3 }, startDate: "2026-10-24", today });
    expect(a.status).toBe("open");
    expect(a.daysUntilDeparture).toBe(1);
  });

  it("kuota 0 dianggap Full dan tidak membagi dengan nol", () => {
    const a = getAvailability({ quota: { total: 0, booked: 0 }, startDate: future, today });
    expect(a.status).toBe("full");
    expect(a.filledRatio).toBe(1);
  });
});
