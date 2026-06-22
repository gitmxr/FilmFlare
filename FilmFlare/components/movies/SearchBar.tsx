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
            type="search"
            placeholder="Search for movies..."
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="flex-grow bg-white p-2 px-4 text-black outline-none"
            aria-label="Search for movies"
            aria-busy={isSearching}
          />
          <div
            className="flex items-center bg-red-600 px-4 text-white"
            aria-live="polite"
            aria-hidden={!isSearching}
          >
            {isSearching ? (
              <span className="text-sm">Searching…</span>
            ) : (
              <span className="text-sm" aria-hidden="true">
                Search
              </span>
            )}
          </div>
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
