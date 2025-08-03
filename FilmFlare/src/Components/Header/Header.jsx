import React from "react";
import { Link } from "react-router-dom";
import logo from "/src/assets/Images/filmflare_logo.webp";

function Header() {
  return (
    <header className="bg-black text-white shadow-lg sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & App Name */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="FilmFlare Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-2xl font-bold text-red-600">
            <span className="text-white">Film</span>Flare
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <Link
            to="/"
            className="text-white hover:text-red-500 transition duration-200 px-3 py-2 rounded"
          >
            Movies
          </Link>
          <Link
            to="/music"
            className="text-white hover:text-red-500 transition duration-200 px-3 py-2 rounded"
          >
            Musics
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
