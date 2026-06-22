import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const socialLinks = [
  {
    icon: <FaGithub size={22} />,
    url: "https://github.com/gitmxr",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin size={22} />,
    url: "https://linkedin.com/in/riazdev18",
    label: "LinkedIn",
  },
  {
    icon: <FaEnvelope size={22} />,
    url: "mailto:riazdev18@gmail.com",
    label: "Email",
  },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-700 bg-gray-900 py-10 text-gray-300">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className="mb-2 text-2xl font-bold text-white">
            <span aria-hidden="true">🎬 </span>
            CineFilly
          </h2>
          <p className="text-sm text-gray-400">
            Discover the latest movies, watch trailers, and explore top-rated
            films.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <h3 className="mb-2 text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            {quickLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="transition duration-200 hover:text-red-600"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center text-center md:items-end md:text-right">
          <h3 className="mb-2 text-lg font-semibold text-white">Follow Me</h3>
          <div className="flex space-x-4">
            {socialLinks.map(({ icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition duration-200 hover:text-red-600"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 px-4 pt-4 text-center text-sm text-gray-500 sm:px-0">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">CineFilly</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
