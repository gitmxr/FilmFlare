import Image from "next/image";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const browseLinks = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/explore/tv", label: "TV & Web Series" },
  { href: "/music", label: "Music" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    icon: <FaGithub size={20} />,
    url: "https://github.com/gitmxr",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin size={20} />,
    url: "https://linkedin.com/in/riazdev18",
    label: "LinkedIn",
  },
  {
    icon: <FaEnvelope size={20} />,
    url: "mailto:riazdev18@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
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
            <ul className="space-y-2 text-sm">
              {browseLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition hover:text-red-400"
                  >
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
            <ul className="space-y-2 text-sm">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition hover:text-red-400"
                  >
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

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-gray-500 sm:text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-300">CineFilly</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
