"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  isSearching?: boolean;
  history?: string[];
  onSelectHistory?: (query: string) => void;
}

export default function SearchBar({
  value,
  onChange,
  isSearching = false,
  history = [],
  onSelectHistory,
}: SearchBarProps) {
  const showHistory = history.length > 0 && !value.trim();

  return (
    <div className="mx-auto max-w-xl">
      <div className="overflow-hidden rounded-3xl border border-gray-700 shadow-lg">
        <div className="flex">
          <input
            type="text"
            placeholder="Search for movies..."
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="flex-grow bg-white p-2 px-4 text-black outline-none"
            aria-label="Search for movies"
          />
          <button
            type="button"
            className="bg-red-600 px-4 text-white transition duration-200 hover:bg-red-700 disabled:opacity-70"
            disabled={isSearching}
            aria-busy={isSearching}
          >
            {isSearching ? "..." : "Search"}
          </button>
        </div>
      </div>

      {showHistory && onSelectHistory && (
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {history.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSelectHistory(item)}
              className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300 transition hover:bg-gray-700 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
