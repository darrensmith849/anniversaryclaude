"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type MarketingNavLinkProps = {
  href: string;
  label: string;
};

export function MarketingNavLink({ href, label }: MarketingNavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`m-link-accent relative transition-colors hover:text-[var(--m-ink)] ${active ? "m-link-accent-active text-[var(--m-amethyst)]" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
