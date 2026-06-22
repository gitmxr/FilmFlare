"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Movies" },
  { href: "/music", label: "Music" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="flex space-x-4">
      {navLinks.map(({ href, label }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded px-3 py-2 transition duration-200 hover:text-red-500 ${
              isActive ? "text-red-500" : "text-white"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
