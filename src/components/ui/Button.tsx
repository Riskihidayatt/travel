import type { ReactNode } from "react";
import { AppLink } from "@/components/primitives/AppLink";
import { cn } from "@/lib/cn";

type Variant = "ink" | "tangerine" | "lime" | "cream" | "whatsapp";
type Size = "md" | "lg";

const FACE: Record<Variant, string> = {
  ink: "bg-ink text-cream border-ink",
  tangerine: "bg-tangerine text-ink border-ink",
  lime: "bg-lime text-ink border-ink",
  cream: "bg-cream text-ink border-ink",
  whatsapp: "bg-whatsapp text-ink border-ink",
};

const SIZE: Record<Size, string> = {
  md: "h-12 px-5 text-[15px] gap-2",
  lg: "h-14 px-7 text-base gap-2.5",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Bayangan solid ala stiker. Matikan di atas background gelap. */
  shadow?: boolean;
  fullWidth?: boolean;
}

/**
 * Tombol bergaya stiker: muka tombol bergeser saat hover/tap di atas "bayangan"
 * solid. Hanya animasi transform → ringan di HP.
 */
function ButtonInner({ variant = "ink", size = "md", shadow = true, fullWidth, children }: CommonProps) {
  return (
    <>
      {shadow && (
        <span aria-hidden="true" className="absolute inset-0 translate-x-1 translate-y-1 rounded-full bg-ink" />
      )}
      <span
        className={cn(
          "relative inline-flex w-full items-center justify-center rounded-full border-2 font-semibold whitespace-nowrap",
          "transition-transform duration-200 ease-out will-change-transform",
          "group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-1 group-active:translate-y-1",
          FACE[variant],
          SIZE[size],
          fullWidth && "w-full",
        )}
      >
        {children}
      </span>
    </>
  );
}

export function ButtonLink({
  href,
  external,
  ariaLabel,
  ...props
}: CommonProps & { href: string; external?: boolean; ariaLabel?: string }) {
  return (
    <AppLink
      href={href}
      external={external}
      aria-label={ariaLabel}
      className={cn(
        "group relative inline-flex rounded-full focus-visible:rounded-full",
        props.fullWidth && "w-full",
        props.className,
      )}
    >
      <ButtonInner {...props} />
    </AppLink>
  );
}

export function Button({
  onClick,
  type = "button",
  ariaLabel,
  ...props
}: CommonProps & { onClick?: () => void; type?: "button" | "submit"; ariaLabel?: string }) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn("group relative inline-flex rounded-full", props.fullWidth && "w-full", props.className)}
    >
      <ButtonInner {...props} />
    </button>
  );
}
