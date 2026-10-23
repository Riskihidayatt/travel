import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Pembungkus link. Seluruh komponen WAJIB memakai ini (bukan next/link langsung).
 * Saat migrasi ke Inertia, ganti isi file ini dengan `<Link>` dari @inertiajs/react.
 *
 * Link eksternal (http, wa.me, mailto, tel) otomatis jadi <a> biasa,
 * dan `external` membuka tab baru dengan rel aman.
 */
export interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  external?: boolean;
  children: ReactNode;
}

const EXTERNAL = /^(https?:|mailto:|tel:)/;

export function AppLink({ href, external, children, ...rest }: AppLinkProps) {
  const isExternal = external ?? EXTERNAL.test(href);

  if (isExternal) {
    const newTab = external ?? href.startsWith("http");
    return (
      <a href={href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
