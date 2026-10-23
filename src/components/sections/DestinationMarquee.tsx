import { Asterisk } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";

/** Dua pita marquee miring berlawanan arah. Berhenti saat hover. */
export function DestinationMarquee({ destinations }: { destinations: string[] }) {
  const half = Math.ceil(destinations.length / 2);
  const rowB = [...destinations.slice(half), ...destinations.slice(0, half)];

  return (
    <section aria-label="Destinasi open trip" className="relative z-10 -mt-6 overflow-hidden py-10 sm:py-14">
      <p className="sr-only">Destinasi kami: {destinations.join(", ")}.</p>
      <div aria-hidden="true" className="flex flex-col gap-0">
        <div className="-mx-4 -rotate-2 border-y-2 border-ink bg-lime py-3 sm:py-4">
          <Marquee duration={38}>
            {destinations.map((d) => (
              <span key={d} className="flex items-center gap-5 pr-5 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-5xl">
                {d}
                <Asterisk className="size-7 sm:size-10" strokeWidth={3} />
              </span>
            ))}
          </Marquee>
        </div>
        <div className="-mx-4 rotate-1 border-y-2 border-ink bg-ink py-3 text-cream sm:py-4">
          <Marquee duration={46} reverse>
            {rowB.map((d) => (
              <span key={d} className="flex items-center gap-5 pr-5 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-5xl">
                <span>{d}</span>
                <span className="size-3 rounded-full bg-tangerine sm:size-4" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
