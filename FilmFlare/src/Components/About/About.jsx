import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6 border-l-4 border-red-600 pl-4">
          About FilmFlare
        </h1>
        <p className="text-gray-300 text-lg mb-4">
          🎥 FilmFlare is your go-to platform for all things cinema. Discover,
          review, and discuss your favorite films with a passionate community of
          movie lovers.
        </p>
        <p className="text-gray-400 mb-4">
          We bring you real-time access to trending movies, detailed film data,
          trailers, and personalized recommendations. Whether you're a casual
          watcher or a hardcore cinephile, FilmFlare is designed to enhance your
          movie journey.
        </p>
        <p className="text-gray-400 mb-4">
          Built using <span className="text-red-500 font-semibold">React</span>,{" "}
          <span className="text-red-500 font-semibold">Tailwind CSS</span>, and
          powered by{" "}
          <span className="text-red-500 font-semibold">TMDB API</span>,
          FilmFlare offers a sleek, fast, and responsive movie exploration
          experience.
        </p>
        <p className="text-gray-400">
          🚀 Stay tuned for more updates, including user accounts, watchlists,
          reviews, and dark mode!
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-200 shadow-md"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
