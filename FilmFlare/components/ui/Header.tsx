import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Movies" },
  { href: "/music", label: "Musics" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-black text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-3 md:flex-row">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/filmflare_logo.webp"
            alt="FilmFlare Logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
            priority
          />
          <span className="text-2xl font-bold text-red-600">
            <span className="text-white">Film</span>Flare
          </span>
        </Link>

        <nav className="flex space-x-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded px-3 py-2 text-white transition duration-200 hover:text-red-500"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
