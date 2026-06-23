import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "CineFilly helps you discover movies, TV shows, web series, cast profiles, trailers, and music — all in one place.",
  path: "/about",
});

const offerings = [
  {
    title: "Movies",
    description:
      "Browse trending and top-rated films, filter by genre and industry, and explore Hollywood, Bollywood, Lollywood, and more.",
    href: "/movies",
  },
  {
    title: "TV & Web Series",
    description:
      "Find binge-worthy shows from around the world. Filter by genre, region, and rating to discover your next watch.",
    href: "/tv",
  },
  {
    title: "Cast & Crew",
    description:
      "Look up actors and filmmakers, view filmographies, and jump from a favorite performer straight to their work.",
    href: "/movies",
  },
  {
    title: "Music Videos",
    description:
      "Explore Indian, Pakistani, and English music videos alongside your film and TV discovery.",
    href: "/music",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-red-400">
            About us
          </p>
          <h1 className="text-3xl font-bold text-yellow-400 sm:text-4xl">
            Your home for entertainment discovery
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-300">
            CineFilly brings together movies, television, web series, cast
            profiles, trailers, and music in a single, easy-to-browse experience.
            Whether you are looking for tonight&apos;s pick or planning your next
            marathon, we help you find what to watch — faster.
          </p>
        </header>

        <section aria-labelledby="mission-heading" className="mb-12">
          <h2
            id="mission-heading"
            className="mb-4 text-xl font-semibold text-white sm:text-2xl"
          >
            Our mission
          </h2>
          <p className="leading-relaxed text-gray-400">
            Entertainment should be simple to explore. CineFilly is built for
            viewers who want accurate information, rich detail pages, and smart
            filters — without jumping between dozens of tabs. From trending
            highlights on the home page to in-depth title and cast pages, every
            part of the experience is designed to help you decide what to watch
            next.
          </p>
        </section>

        <section aria-labelledby="offerings-heading" className="mb-12">
          <h2
            id="offerings-heading"
            className="mb-6 text-xl font-semibold text-white sm:text-2xl"
          >
            What you can explore
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {offerings.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-white/10 bg-gray-800/50 p-5"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-3 inline-block text-sm font-medium text-red-400 transition hover:text-red-300"
                >
                  Browse {item.title.toLowerCase()} →
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="experience-heading" className="mb-12">
          <h2
            id="experience-heading"
            className="mb-4 text-xl font-semibold text-white sm:text-2xl"
          >
            Built for everyday viewers
          </h2>
          <ul className="space-y-3 text-gray-400">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
              <span>
                <strong className="font-medium text-gray-200">
                  Search across titles and people
                </strong>{" "}
                — find movies, shows, and cast members from one search bar.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
              <span>
                <strong className="font-medium text-gray-200">
                  Watch trailers in-app
                </strong>{" "}
                — preview a title before you commit, without leaving CineFilly.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
              <span>
                <strong className="font-medium text-gray-200">
                  Discover similar titles
                </strong>{" "}
                — recommendations on detail pages help you keep exploring.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
              <span>
                <strong className="font-medium text-gray-200">
                  Works on any device
                </strong>{" "}
                — a responsive layout optimized for phones, tablets, and
                desktops.
              </span>
            </li>
          </ul>
        </section>

        <section
          aria-labelledby="attribution-heading"
          className="mb-10 rounded-xl border border-white/10 bg-gray-800/30 p-6"
        >
          <h2
            id="attribution-heading"
            className="mb-3 text-lg font-semibold text-white"
          >
            Content &amp; attribution
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Movie and TV metadata, images, and related information are provided
            by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 underline-offset-2 hover:underline"
            >
              The Movie Database (TMDB)
            </a>
            . Music videos are sourced via YouTube. CineFilly does not host
            full-length films or episodes — we help you discover titles and
            watch official trailers and music content through embedded players.
          </p>
          <p className="mt-3 text-xs text-gray-500">
            CineFilly is not endorsed, certified, or affiliated with TMDB or
            YouTube.
          </p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-block rounded-full bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Start exploring
          </Link>
          <Link
            href="/contact"
            className="inline-block rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition hover:border-red-500 hover:text-red-400"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
