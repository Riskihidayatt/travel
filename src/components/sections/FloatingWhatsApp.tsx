"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { AppLink } from "@/components/primitives/AppLink";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Tombol WhatsApp melayang, muncul setelah melewati hero. */
export function FloatingWhatsApp({ href, label = "Chat admin via WhatsApp" }: { href: string; label?: string }) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 480));

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
        >
          <AppLink href={href} aria-label={label} className="group relative grid size-14 place-items-center rounded-full sm:size-16">
            <span aria-hidden="true" className="absolute inset-0 animate-ping-soft rounded-full bg-whatsapp" />
            <span aria-hidden="true" className="absolute inset-0 translate-x-1 translate-y-1 rounded-full bg-ink" />
            <span className="relative grid size-full place-items-center rounded-full border-2 border-ink bg-whatsapp text-ink transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:-rotate-12 group-active:scale-90">
              <WhatsAppIcon size={28} />
            </span>
            <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 rounded-full border-2 border-ink bg-cream px-3 py-1.5 text-sm font-bold whitespace-nowrap text-ink opacity-0 shadow-sticker transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
              Chat admin
            </span>
          </AppLink>
        </m.div>
      )}
    </AnimatePresence>
  );
}
