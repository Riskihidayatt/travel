import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const COLORS = {
  ink: "#17130e",
  cream: "#fff6e9",
  creamDeep: "#fbe7c6",
  tangerine: "#ff5b1f",
  lime: "#d7f75b",
  lilac: "#c8b9ff",
  muted: "#5e5448",
};

async function loadFonts() {
  const dir = join(process.cwd(), "src/assets/fonts");
  const [display, body] = await Promise.all([
    readFile(join(dir, "bricolage-grotesque-latin-800-normal.woff")),
    readFile(join(dir, "plus-jakarta-sans-latin-600-normal.woff")),
  ]);
  return [
    { name: "Bricolage", data: display, weight: 800 as const, style: "normal" as const },
    { name: "Jakarta", data: body, weight: 600 as const, style: "normal" as const },
  ];
}

/** Ambil foto sebagai data URL. Kalau gagal (offline/timeout), kembalikan null → pakai gradien. */
async function loadPhoto(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000), redirect: "follow" });
    if (!res.ok) return null;
    const type = res.headers.get("content-type") ?? "image/jpeg";
    if (!type.startsWith("image/")) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    return `data:${type};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export interface OgInput {
  brand: string;
  photoUrl: string;
  eyebrow: string;
  title: string;
  lines: string[];
  badge?: { text: string; tone: "lime" | "tangerine" | "ink" | "cream" };
  price?: string;
}

const BADGE_BG = { lime: COLORS.lime, tangerine: COLORS.tangerine, ink: COLORS.ink, cream: COLORS.creamDeep };

export async function renderOg(input: OgInput) {
  const [fonts, photo] = await Promise.all([loadFonts(), loadPhoto(input.photoUrl)]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: COLORS.cream, fontFamily: "Jakarta" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 690, padding: "56px 56px 52px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 14,
                border: `3px solid ${COLORS.ink}`,
                background: COLORS.tangerine,
                fontFamily: "Bricolage",
                fontSize: 30,
                color: COLORS.ink,
                transform: "rotate(-6deg)",
                boxShadow: `4px 4px 0 ${COLORS.ink}`,
              }}
            >
              G
            </div>
            <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: 36, color: COLORS.ink }}>{input.brand.toLowerCase()}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {input.badge && (
                <div
                  style={{
                    display: "flex",
                    padding: "6px 18px",
                    borderRadius: 999,
                    border: `3px solid ${COLORS.ink}`,
                    background: BADGE_BG[input.badge.tone],
                    color: input.badge.tone === "ink" ? COLORS.cream : COLORS.ink,
                    fontFamily: "Bricolage",
                    fontSize: 22,
                    textTransform: "uppercase",
                    transform: "rotate(-4deg)",
                    boxShadow: `3px 3px 0 ${COLORS.ink}`,
                  }}
                >
                  {input.badge.text}
                </div>
              )}
              <div style={{ display: "flex", fontSize: 22, color: COLORS.muted }}>{input.eyebrow}</div>
            </div>
            <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: input.title.length > 26 ? 66 : 78, lineHeight: 0.95, letterSpacing: -2.5, color: COLORS.ink }}>
              {input.title}
            </div>
            {input.lines.map((line) => (
              <div key={line} style={{ display: "flex", fontSize: 28, color: COLORS.ink }}>
                {line}
              </div>
            ))}
          </div>

          {input.price ? (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  padding: "12px 26px",
                  borderRadius: 999,
                  border: `3px solid ${COLORS.ink}`,
                  background: COLORS.lime,
                  fontFamily: "Bricolage",
                  fontSize: 34,
                  color: COLORS.ink,
                  boxShadow: `5px 5px 0 ${COLORS.ink}`,
                }}
              >
                {input.price}
              </div>
              <div style={{ display: "flex", fontSize: 22, color: COLORS.muted }}>Daftar via WhatsApp</div>
            </div>
          ) : (
            <div style={{ display: "flex", fontSize: 24, color: COLORS.muted }}>Daftar cukup lewat WhatsApp</div>
          )}
        </div>

        <div style={{ display: "flex", flex: 1, padding: "28px 28px 28px 0" }}>
          <div
            style={{
              display: "flex",
              flex: 1,
              borderRadius: 40,
              border: `4px solid ${COLORS.ink}`,
              overflow: "hidden",
              background: `linear-gradient(135deg, ${COLORS.lime}, ${COLORS.lilac} 55%, ${COLORS.tangerine})`,
            }}
          >
            {photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt="" width={482} height={574} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
