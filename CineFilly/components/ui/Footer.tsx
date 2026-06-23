import Image from "next/image";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const browseLinks = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/tv", label: "TV & Web Series" },
  { href: "/music", label: "Music" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    icon: <FaGithub size={18} />,
    url: "https://github.com/gitmxr",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin size={18} />,
    url: "https://linkedin.com/in/riazdev18",
    label: "LinkedIn",
  },
  {
    icon: <FaEnvelope size={18} />,
    url: "mailto:riazdev18@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-6 sm:pb-12 sm:pt-12">
        {/* Mobile: single centered column */}
        <div className="flex flex-col items-center text-center md:hidden">
          <div className="mb-3 flex items-center gap-2.5">
            <Image
              src="/images/cinefilly_logo.webp"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
              aria-hidden
            />
            <span className="text-lg font-bold text-white">
              Cine<span className="text-red-500">Filly</span>
            </span>
          </div>
          <p className="mb-8 max-w-xs text-sm leading-relaxed">
            Your hub for movies, TV shows, web series, trailers, and music.
          </p>

          <div className="mb-8 w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
              Browse
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {browseLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block transition hover:text-red-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-white">
              Company
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block transition hover:text-red-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">
            Connect
          </p>
          <div className="flex justify-center gap-3">
            {socialLinks.map(({ icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-red-500/40 hover:text-red-400"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Tablet & desktop */}
        <div className="hidden gap-10 md:grid md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <Image
                src="/images/cinefilly_logo.webp"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
                aria-hidden
              />
              <span className="text-lg font-bold text-white">
                Cine<span className="text-red-500">Filly</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed">
              Your hub for movies, TV shows, web series, trailers, and music —
              powered by TMDB.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Browse
            </h3>
            <ul className="space-y-2.5 text-sm">
              {browseLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-red-400">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-red-400">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-red-500/40 hover:text-red-400"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-gray-500 sm:mt-10 sm:pt-6 sm:text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-300">CineFilly</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
