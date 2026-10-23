"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.2, 0.9, 0.25, 1] as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const TAGS = { div: m.div, li: m.li, ul: m.ul, ol: m.ol, dl: m.dl, span: m.span } as const;
type Tag = keyof typeof TAGS;

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
}

/** Elemen tunggal yang muncul saat masuk viewport. */
export function Reveal({ children, className, as = "div", delay = 0 }: RevealProps) {
  const Component = TAGS[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: itemVariants.hidden,
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
      }}
    >
      {children}
    </Component>
  );
}

/** Container stagger: anak `RevealItem` muncul bergiliran. */
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
}: RevealProps & { stagger?: number }) {
  const Component = TAGS[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<RevealProps, "delay">) {
  const Component = TAGS[as];
  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
