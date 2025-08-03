import React, { useState, useEffect } from "react";
import { searchYouTubeMusic } from "../../services/YouTubeAPI_Call";
import MusicCard from "../MusicCard/MusicCard";

function Music() {
  const [loading, setLoading] = useState(true);
  const [indianSongs, setIndianSongs] = useState([]);
  const [pakistaniSongs, setPakistaniSongs] = useState([]);
  const [englishSongs, setEnglishSongs] = useState([]);
  const [indianPage, setIndianPage] = useState(1);
  const [pakistaniPage, setPakistaniPage] = useState(1);
  const [englishPage, setEnglishPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchMusicSafe = async (query) => {
    try {
      const result = await searchYouTubeMusic(query);
      return result || [];
    } catch (error) {
      console.error(`Error fetching for query "${query}":`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllMusic = async () => {
      setLoading(true);
      try {
        const [indiaRes, pakistanRes, englishRes] = await Promise.all([
          fetchMusicSafe("Latest Indian songs"),
          fetchMusicSafe("Pakistani songs"),
          fetchMusicSafe("English pop songs"),
        ]);
        setIndianSongs(indiaRes);
        setPakistaniSongs(pakistanRes);
        setEnglishSongs(englishRes);
      } finally {
        setLoading(false);
      }
    };

    if (!searchQuery) fetchAllMusic();
  }, [indianPage, pakistaniPage, englishPage, searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    setLoading(true);
    try {
      const results = await fetchMusicSafe(trimmedQuery);
      setSearchResults(results);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const PaginationButtons = ({ page, setPage }) => (
    <div className="flex justify-end mt-4 gap-2">
      <button
        onClick={() => setPage(page - 1)}
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
        onClick={() => setPage(page + 1)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition"
      >
        Next →
      </button>
    </div>
  );

  const renderSection = (title, songs, page, setPage) => (
    <>
      <div className="text-left w-full mt-8 mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white border-l-4 border-red-600 pl-4">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {songs.map((song) => (
          <MusicCard key={song.id.videoId} song={song} />
        ))}
      </div>
      <PaginationButtons page={page} setPage={setPage} />
    </>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Search Bar */}
      <div className="pt-4 sm:pt-6 px-4 sm:px-6 pb-4 max-w-7xl mx-auto">
        <form
          onSubmit={handleSearch}
          className="flex rounded-3xl shadow-lg overflow-hidden border border-gray-700 max-w-xl mx-auto"
        >
          <input
            type="text"
            placeholder="Search for songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 px-4 flex-grow bg-white text-black outline-none"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 rounded-r-3xl hover:bg-red-700 transition duration-200"
          >
            Search
          </button>
        </form>

        {searchResults.length > 0 && (
          <div className="text-center mt-3">
            <button
              onClick={clearSearch}
              className="text-sm text-gray-300 hover:text-white underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Songs Section */}
      <div className="px-4 sm:px-6 pb-20 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center text-gray-400 animate-pulse">
            Loading music...
          </div>
        ) : searchResults.length > 0 ? (
          <div className="mb-10">
            <div className="text-left w-full mb-4">
              <div className="inline-block text-2xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 rounded-xl shadow-lg">
                🔍 Search Results
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {searchResults.map((song) => (
                <MusicCard key={song.id.videoId} song={song} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {renderSection("🇮🇳 Indian Songs", indianSongs, indianPage, setIndianPage)}
            {renderSection("🇵🇰 Pakistani Songs", pakistaniSongs, pakistaniPage, setPakistaniPage)}
            {renderSection("🇬🇧 English Songs", englishSongs, englishPage, setEnglishPage)}
          </>
        )}
      </div>
    </div>
  );
}

export default Music;
