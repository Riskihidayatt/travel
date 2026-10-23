import { ArrowDownRight } from "lucide-react";

/** Stiker bulat dengan teks melingkar yang berputar pelan. */
export function SpinningSticker({ text, className }: { text: string; className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <div className="relative grid size-28 place-items-center sm:size-32">
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id="sticker-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <circle cx="60" cy="60" r="58" className="fill-lime stroke-ink" strokeWidth="2.5" />
        <text className="fill-ink font-display text-[11.5px] font-extrabold uppercase tracking-[0.18em]">
          <textPath href="#sticker-circle">{text.repeat(2)}</textPath>
        </text>
      </svg>
      <span className="relative grid size-12 place-items-center rounded-full border-2 border-ink bg-tangerine">
        <ArrowDownRight className="size-6 text-ink" strokeWidth={2.75} />
      </span>
      </div>
    </div>
  );
}
