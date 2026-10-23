import { Check, X } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function IncludeExclude({ includes, excludes }: { includes: string[]; excludes: string[] }) {
  return (
    <RevealGroup className="grid gap-4 sm:grid-cols-2">
      <RevealItem className="rounded-card border-2 border-ink bg-lime p-5 sm:p-6">
        <h3 className="font-display text-xl font-extrabold">Sudah termasuk</h3>
        <ul className="mt-4 flex flex-col gap-2.5">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px]">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-lime">
                <Check aria-hidden="true" className="size-3" strokeWidth={3.5} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </RevealItem>
      <RevealItem className="rounded-card border-2 border-ink bg-cream-deep p-5 sm:p-6">
        <h3 className="font-display text-xl font-extrabold">Belum termasuk</h3>
        <ul className="mt-4 flex flex-col gap-2.5">
          {excludes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px]">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 border-ink bg-cream">
                <X aria-hidden="true" className="size-3" strokeWidth={3.5} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </RevealItem>
    </RevealGroup>
  );
}
