import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, className, tone = "lime" }: { children: ReactNode; className?: string; tone?: "lime" | "tangerine" | "lilac" | "cream" }) {
  const tones = {
    lime: "bg-lime text-ink",
    tangerine: "bg-tangerine text-ink",
    lilac: "bg-lilac text-ink",
    cream: "bg-cream text-ink",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex w-fit -rotate-2 items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] shadow-sticker",
        tones[tone],
        className,
      )}
    >
      <Sparkles aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
      {children}
    </span>
  );
}
