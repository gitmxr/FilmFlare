import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about CineFilly — your platform for discovering movies, trailers, and music.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 border-l-4 border-red-600 pl-4 text-4xl font-bold text-yellow-400">
          About CineFilly
        </h1>

        <p className="mb-4 text-lg text-gray-300">
          🎥 CineFilly is your go-to platform for all things cinema. Discover,
          review, and discuss your favorite films with a passionate community of
          movie lovers.
        </p>

        <p className="mb-4 text-gray-400">
          We bring you real-time access to trending movies, detailed film data,
          trailers, and music discovery. Whether you&apos;re a casual watcher or a
          hardcore cinephile, CineFilly is designed to enhance your movie journey.
        </p>

        <h2 className="mb-2 mt-8 text-2xl font-semibold text-white">
          🔧 Technologies Used
        </h2>
        <p className="mb-4 text-gray-400">
          Built using{" "}
          <span className="font-semibold text-red-500">Next.js</span>,{" "}
          <span className="font-semibold text-red-500">React</span>,{" "}
          <span className="font-semibold text-red-500">TypeScript</span>,{" "}
          <span className="font-semibold text-red-500">Tailwind CSS</span>,{" "}
          <span className="font-semibold text-red-500">Zustand</span>, and
          powered by{" "}
          <span className="font-semibold text-red-500">TMDB</span> &{" "}
          <span className="font-semibold text-red-500">YouTube APIs</span>,
          CineFilly offers a sleek, fast, and responsive entertainment experience.
        </p>

        <p className="text-gray-400">
          🚀 Stay tuned for more updates, including user accounts, watchlists,
          reviews, and a chatbot movie assistant!
        </p>

        <div className="mt-6">
          <Link
            href="/"
            aria-label="Back to Home"
            className="inline-block rounded-full bg-red-600 px-6 py-2 text-white shadow-md transition duration-200 hover:bg-red-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
