"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppLink } from "@/components/primitives/AppLink";
import { useScrollLock } from "@/components/providers/SmoothScrollProvider";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import type { NavItem, SocialLinks } from "@/content/types";
import { cn } from "@/lib/cn";

export interface NavbarProps {
  brandName: string;
  handle: string;
  items: NavItem[];
  whatsappHref: string;
  social: SocialLinks;
  /** Warna teks awal (sebelum di-scroll): "light" untuk di atas foto gelap. */
  tone?: "light" | "dark";
}

export function Logo({ brandName, className }: { brandName: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight", className)}>
      <span aria-hidden="true" className="grid size-9 -rotate-6 place-items-center rounded-xl border-2 border-ink bg-tangerine text-lg text-ink shadow-sticker">
        G
      </span>
      {brandName.toLowerCase()}
      <span aria-hidden="true" className="-ml-1.5 size-2 self-end mb-2 rounded-full bg-tangerine" />
    </span>
  );
}

/**
 * Navbar sticky: transparan di atas hero → blur saat di-scroll,
 * sembunyi saat scroll ke bawah, muncul saat scroll ke atas.
 */
export function Navbar({ brandName, handle, items, whatsappHref, social, tone = "dark" }: NavbarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const { lock, unlock } = useScrollLock();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    setScrolled(y > 24);
    if (Math.abs(delta) > 6) setHidden(delta > 0 && y > 160);
    lastY.current = y;
  });

  useEffect(() => {
    if (!open) return;
    lock();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lock, unlock]);

  const light = tone === "light" && !scrolled && !open;

  return (
    <>
      <m.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.2, 0.9, 0.25, 1] }}
      >
        <div
          className={cn(
            "relative transition-opacity duration-300",
            "before:absolute before:inset-0 before:-z-10 before:border-b-2 before:border-ink before:bg-cream/80 before:backdrop-blur-xl before:transition-opacity before:duration-300",
            scrolled && !open ? "before:opacity-100" : "before:opacity-0",
          )}
        >
          <nav aria-label="Navigasi utama" className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-4 xs:px-5 sm:h-20 sm:px-8">
            <AppLink href="/" aria-label={`${brandName} — beranda`} className={cn("relative z-[1]", light ? "text-cream" : "text-ink")}>
              <Logo brandName={brandName} />
            </AppLink>

            <ul className="hidden items-center gap-1 lg:flex">
              {items.map((item) => (
                <li key={item.href}>
                  <AppLink
                    href={item.href}
                    className={cn(
                      "group relative rounded-full px-4 py-2 text-[15px] font-semibold",
                      light ? "text-cream" : "text-ink",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 scale-75 rounded-full bg-lime opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100"
                    />
                    <span className="relative group-hover:text-ink">{item.label}</span>
                  </AppLink>
                </li>
              ))}
            </ul>

            <div className="relative z-[1] flex items-center gap-2">
              <AppLink
                href={whatsappHref}
                className="group relative hidden rounded-full sm:inline-flex"
                aria-label="Chat admin via WhatsApp"
              >
                <span aria-hidden="true" className="absolute inset-0 translate-x-0.5 translate-y-0.5 rounded-full bg-ink" />
                <span className="relative inline-flex h-11 items-center gap-2 rounded-full border-2 border-ink bg-lime px-4 text-sm font-bold text-ink transition-transform group-hover:-translate-y-0.5">
                  <WhatsAppIcon size={18} />
                  Chat Admin
                </span>
              </AppLink>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Tutup menu" : "Buka menu"}
                className="grid size-11 place-items-center rounded-full border-2 border-ink bg-cream text-ink shadow-sticker transition-transform active:scale-90 lg:hidden"
              >
                {open ? <X className="size-5" strokeWidth={2.75} /> : <Menu className="size-5" strokeWidth={2.75} />}
              </button>
            </div>
          </nav>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-lime px-5 pt-24 pb-8 lg:hidden"
            initial={{ opacity: 0, y: "-4%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-4%", transition: { duration: 0.2 } }}
            transition={{ duration: 0.35, ease: [0.2, 0.9, 0.25, 1] }}
          >
            <m.ul
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
            >
              {items.map((item, i) => (
                <m.li
                  key={item.href}
                  className="overflow-hidden"
                  variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5, ease: [0.2, 0.9, 0.25, 1] }}
                >
                  <AppLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-3 py-2 font-display text-[clamp(2.4rem,11vw,3.5rem)] leading-none font-extrabold tracking-tight text-ink"
                  >
                    <span className="font-sans text-sm font-bold text-ink/80">0{i + 1}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">{item.label}</span>
                  </AppLink>
                </m.li>
              ))}
            </m.ul>

            <m.div
              className="mt-auto flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.35 } }}
            >
              <AppLink
                href={whatsappHref}
                className="flex h-14 items-center justify-center gap-2 rounded-full border-2 border-ink bg-ink text-base font-bold text-cream"
              >
                <WhatsAppIcon size={20} />
                Chat Admin
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </AppLink>
              <div className="flex items-center justify-between text-sm font-semibold text-ink">
                <span>@{handle}</span>
                <span className="flex gap-2">
                  <AppLink href={social.instagram} aria-label="Instagram" className="grid size-11 place-items-center rounded-full border-2 border-ink bg-cream">
                    <InstagramIcon size={20} />
                  </AppLink>
                  <AppLink href={social.tiktok} aria-label="TikTok" className="grid size-11 place-items-center rounded-full border-2 border-ink bg-cream">
                    <TikTokIcon size={20} />
                  </AppLink>
                </span>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
