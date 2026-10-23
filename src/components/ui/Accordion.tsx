"use client";

import { AnimatePresence, m } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItemData {
  id: string;
  title: ReactNode;
  /** Elemen kecil di kiri judul, mis. badge "Hari 1". */
  leading?: ReactNode;
  content: ReactNode;
}

/**
 * Accordion aksesibel (pola WAI-ARIA): tombol dengan aria-expanded/aria-controls,
 * navigasi panah atas/bawah, Home/End. Panel muncul dengan opacity + transform saja.
 */
export function Accordion({
  items,
  defaultOpenIds = [],
  multiple = false,
  variant = "card",
  className,
}: {
  items: AccordionItemData[];
  defaultOpenIds?: string[];
  multiple?: boolean;
  variant?: "card" | "timeline";
  className?: string;
}) {
  const [open, setOpen] = useState<string[]>(defaultOpenIds);
  const baseId = useId();
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const toggle = (id: string) => {
    setOpen((current) => {
      const isOpen = current.includes(id);
      if (isOpen) return current.filter((x) => x !== id);
      return multiple ? [...current, id] : [id];
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const target =
      event.key === "ArrowDown" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowUp" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (target === null) return;
    event.preventDefault();
    buttonsRef.current[target]?.focus();
  };

  return (
    <div className={cn(variant === "card" ? "flex flex-col gap-3" : "relative flex flex-col", className)}>
      {variant === "timeline" && (
        <span aria-hidden="true" className="absolute top-6 bottom-6 left-[1.4rem] w-0.5 bg-[repeating-linear-gradient(to_bottom,var(--color-ink)_0_6px,transparent_6px_12px)]" />
      )}
      {items.map((item, index) => {
        const isOpen = open.includes(item.id);
        const buttonId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div
            key={item.id}
            className={cn(
              variant === "card" &&
                "rounded-3xl border-2 border-ink",
              variant === "card" && (isOpen ? "bg-lime shadow-sticker" : "bg-cream hover:bg-cream-deep"),
              variant === "timeline" && "relative pb-3 pl-14",
            )}
          >
            {variant === "timeline" && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-3 left-0 grid size-11 place-items-center rounded-full border-2 border-ink font-display text-sm font-extrabold transition-transform duration-300",
                  isOpen ? "scale-110 bg-tangerine" : "bg-cream",
                )}
              >
                {index + 1}
              </span>
            )}
            <h3 className="m-0">
              <button
                ref={(el) => {
                  buttonsRef.current[index] = el;
                }}
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => onKeyDown(e, index)}
                className={cn(
                  "flex w-full items-center gap-3 text-left font-display font-bold",
                  variant === "card" ? "rounded-3xl px-5 py-4 text-base sm:px-6 sm:py-5 sm:text-lg" : "rounded-2xl py-4 text-lg",
                  variant === "timeline" && (isOpen ? "" : "hover:text-tangerine-deep"),
                )}
              >
                {item.leading}
                <span className="flex-1">{item.title}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border-2 border-ink transition-transform duration-300",
                    isOpen ? "rotate-45 bg-ink text-cream" : "bg-cream text-ink",
                  )}
                >
                  <Plus className="size-4" strokeWidth={3} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.3, ease: [0.2, 0.9, 0.25, 1] }}
                  className={cn(variant === "card" ? "px-5 pb-5 sm:px-6 sm:pb-6" : "pb-4")}
                >
                  {item.content}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
