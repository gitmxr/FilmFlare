import Link from "next/link";
import { FaFilm, FaMusic, FaTv } from "react-icons/fa";

const categories = [
  {
    href: "/movies",
    label: "Movies",
    description: "Hollywood, Bollywood, Lollywood & more",
    icon: FaFilm,
    accent: "from-red-600/20 to-red-900/10",
  },
  {
    href: "/tv",
    label: "TV & Web Series",
    description: "Binge-worthy shows and streaming series",
    icon: FaTv,
    accent: "from-blue-600/20 to-blue-900/10",
  },
  {
    href: "/music",
    label: "Music",
    description: "Soundtracks, artists, and playlists",
    icon: FaMusic,
    accent: "from-purple-600/20 to-purple-900/10",
  },
];

export default function BrowseCategories() {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold text-white sm:text-2xl">
        Browse by category
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ href, label, description, icon: Icon, accent }) => (
          <Link
            key={href}
            href={href}
            className={`group rounded-xl border border-white/10 bg-gradient-to-br ${accent} p-5 transition hover:border-red-500/40 hover:shadow-lg hover:shadow-red-900/10`}
          >
            <div className="mb-3 inline-flex rounded-lg bg-black/40 p-2.5 text-red-400 transition group-hover:text-red-300">
              <Icon size={22} aria-hidden />
            </div>
            <h3 className="text-lg font-semibold text-white">{label}</h3>
            <p className="mt-1 text-sm text-gray-400">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
