import { Accordion } from "@/components/ui/Accordion";
import type { ItineraryDay } from "@/content/types";

/** Itinerary per hari dalam bentuk timeline accordion. */
export function Itinerary({ days }: { days: ItineraryDay[] }) {
  return (
    <Accordion
      variant="timeline"
      multiple
      defaultOpenIds={["day-1"]}
      items={days.map((d) => ({
        id: `day-${d.day}`,
        title: (
          <span className="flex flex-col">
            <span className="font-sans text-xs font-bold tracking-[0.14em] text-tangerine-deep uppercase">Hari {d.day}</span>
            <span>{d.title}</span>
          </span>
        ),
        content: (
          <ul className="flex flex-col gap-2 rounded-2xl border-2 border-ink bg-cream p-4">
            {d.activities.map((a) => (
              <li key={a} className="flex gap-2.5 text-[15px]">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-tangerine" />
                {a}
              </li>
            ))}
          </ul>
        ),
      }))}
    />
  );
}
