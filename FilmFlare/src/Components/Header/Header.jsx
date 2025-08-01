import React from "react";
import { Link } from "react-router-dom";
import logo from "/src/assets/Images/filmflare_logo.webp";

function Header({ searchQuery, setSearchQuery }) {
  const handleSearch = () => {
    const searchEvent = new CustomEvent("searchTriggered");
    window.dispatchEvent(searchEvent);
  };

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

        {/* Search Bar */}
        <div className="w-full md:max-w-xl">
          <div className="flex rounded-3xl shadow-lg overflow-hidden border border-gray-700">
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 px-4 flex-grow bg-white text-black outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-red-600 text-white px-4 rounded-r-3xl hover:bg-red-700 transition duration-200"
            >
              Search
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-red-500 transition duration-200">
            Home
          </Link>
          {/* Add more links here if needed */}
        </nav>
      </div>
    </header>
  );
}

export default Header;
