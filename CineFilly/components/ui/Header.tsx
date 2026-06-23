"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/tv", label: "TV & Series" },
  { href: "/music", label: "Music" },
];

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  if (href === "/movies") {
    return pathname === "/movies" || pathname.startsWith("/movie/");
  }
  if (href === "/tv") {
    return pathname === "/tv" || pathname.startsWith("/tv/");
  }
  return pathname.startsWith(href);
}

function NavItem({
  href,
  label,
  isActive,
  onNavigate,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={`px-3 py-2 text-sm transition ${
        isActive
          ? "font-semibold text-red-500"
          : "font-medium text-gray-300 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/90 text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/images/cinefilly_logo.webp"
            alt="CineFilly Logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full"
            priority
          />
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Cine</span>
            <span className="text-red-500">Filly</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex"
        >
          {navLinks.map(({ href, label }) => (
            <NavItem
              key={href}
              href={href}
              label={label}
              isActive={isNavActive(pathname, href)}
            />
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-300 transition hover:bg-white/5 hover:text-white md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-gray-950/95 px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map(({ href, label }) => (
              <NavItem
                key={href}
                href={href}
                label={label}
                isActive={isNavActive(pathname, href)}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
