import { Ban, CircleCheck, Flame, Hourglass } from "lucide-react";
import type { AvailabilityStatus } from "@/lib/availability";
import { cn } from "@/lib/cn";

const STYLE: Record<AvailabilityStatus, { className: string; Icon: typeof Flame; rotate: string }> = {
  open: { className: "bg-lime text-ink", Icon: CircleCheck, rotate: "-rotate-6" },
  "almost-full": { className: "bg-tangerine text-ink", Icon: Flame, rotate: "rotate-3" },
  full: { className: "bg-ink text-cream", Icon: Ban, rotate: "-rotate-3" },
  finished: { className: "bg-cream-deep text-ink", Icon: Hourglass, rotate: "rotate-2" },
};

/** Badge status bergaya stiker yang sedikit miring. */
export function StatusSticker({
  status,
  label,
  className,
  size = "md",
}: {
  status: AvailabilityStatus;
  label: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const { className: tone, Icon, rotate } = STYLE[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-2 border-ink font-display font-extrabold uppercase tracking-wide shadow-sticker",
        size === "md" ? "px-3 py-1 text-xs" : "px-2.5 py-0.5 text-[11px]",
        tone,
        rotate,
        className,
      )}
    >
      <Icon aria-hidden="true" className={size === "md" ? "size-3.5" : "size-3"} strokeWidth={2.75} />
      {label}
    </span>
  );
}
