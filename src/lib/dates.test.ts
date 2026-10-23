import { describe, expect, it } from "vitest";
import { addDays, diffInDays, todayISO } from "./dates";

describe("dates", () => {
  it("addDays melewati batas bulan & tahun", () => {
    expect(addDays("2026-12-30", 3)).toBe("2027-01-02");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
  });

  it("diffInDays", () => {
    expect(diffInDays("2026-10-23", "2026-11-03")).toBe(11);
    expect(diffInDays("2026-10-23", "2026-10-17")).toBe(-6);
  });

  it("todayISO memakai zona waktu WIB", () => {
    // 2026-10-23 20:00 UTC = 2026-10-24 03:00 WIB
    expect(todayISO(new Date("2026-10-23T20:00:00Z"))).toBe("2026-10-24");
    expect(todayISO(new Date("2026-10-23T10:00:00Z"))).toBe("2026-10-23");
  });
});
