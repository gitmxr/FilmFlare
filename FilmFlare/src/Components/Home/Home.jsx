import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import MovieCard from "../MovieCard/MovieCard";
import { searchMovies } from "../../services/TMDbAPI_Call";

function Home() {
  const {
    trending, topRated, bollywood, hollywood,
    trendingPage, topRatedPage, bollywoodPage, hollywoodPage
  } = useLoaderData();

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchMovies(searchQuery).then(setSearchResults);
      } else setSearchResults([]);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const goToPage = (param, page) => {
    const params = new URLSearchParams();
    params.set(param, page);
    navigate(`?${params.toString()}`);
  };

  const PaginationButtons = ({ page, param }) => (
    <div className="flex justify-end mt-4 gap-2">
      <button
        onClick={() => goToPage(param, page - 1)}
        disabled={page <= 1}
        className={`px-4 py-1 rounded transition ${
          page <= 1
            ? "bg-gray-600 cursor-not-allowed text-gray-300"
            : "bg-red-600 hover:bg-red-700 text-white"
        }`}
      >
        ← Prev
      </button>
      <button
        onClick={() => goToPage(param, page + 1)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition"
      >
        Next →
      </button>
    </div>
  );

  const renderSection = (title, movies, page, param) => (
    <>
      <div className="text-left w-full mt-8 mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white border-l-4 border-red-600 pl-4">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} posterBaseUrl={posterBaseUrl} />
        ))}
      </div>
      <PaginationButtons page={page} param={param} />
    </>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Moved Search Bar here */}
      <div className="pt-4 sm:pt-6 px-4 sm:px-6 pb-4 max-w-7xl mx-auto">
        <div className="flex rounded-3xl shadow-lg overflow-hidden border border-gray-700 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 px-4 flex-grow bg-white text-black outline-none"
          />
          <button
            className="bg-red-600 text-white px-4 rounded-r-3xl hover:bg-red-700 transition duration-200"
          >
            Search
          </button>
        </div>
      </div>

      {/* Movies and Results Section */}
      <div className="px-4 sm:px-6 pb-20 max-w-7xl mx-auto">
        {searchResults.length > 0 && (
          <div className="mb-10">
            <div className="text-left w-full mb-4">
              <div className="inline-block text-2xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 rounded-xl shadow-lg">
                🔍 Search Results
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {searchResults.map((m) => (
                <MovieCard key={m.id} movie={m} posterBaseUrl={posterBaseUrl} />
              ))}
            </div>
          </div>
        )}

        {renderSection("Trending Movies", trending, trendingPage, "trendingPage")}
        {renderSection("Top Rated Movies", topRated, topRatedPage, "topRatedPage")}
        {renderSection("Bollywood Movies", bollywood, bollywoodPage, "bollywoodPage")}
        {renderSection("Hollywood Movies", hollywood, hollywoodPage, "hollywoodPage")}
      </div>
    </div>
  );
}

export default Home;
