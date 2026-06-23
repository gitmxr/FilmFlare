"use client";

import { FormEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  isSearching?: boolean;
  history?: string[];
  onSelectHistory?: (query: string) => void;
  onSubmit?: () => void;
  variant?: "default" | "hero";
}

export default function SearchBar({
  value,
  onChange,
  isSearching = false,
  history = [],
  onSelectHistory,
  onSubmit,
  variant = "default",
}: SearchBarProps) {
  const showHistory = history.length > 0 && !value.trim();
  const isHero = variant === "hero";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <div className={isHero ? "w-full max-w-2xl" : "mx-auto max-w-xl"}>
      <form
        onSubmit={handleSubmit}
        className={
          isHero
            ? "overflow-hidden rounded-full border border-white/25 bg-white/95 shadow-lg backdrop-blur-sm"
            : "overflow-hidden rounded-3xl border border-gray-700 shadow-lg"
        }
      >
        <div className="flex min-w-0">
          <input
            type="search"
            placeholder={
              isHero
                ? "Search movies, TV shows, people..."
                : "Search for movies..."
            }
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="min-w-0 flex-grow bg-transparent p-2.5 px-4 text-black outline-none sm:px-5 sm:py-3"
            aria-label={isHero ? "Search movies, TV shows, and people" : "Search for movies"}
            aria-busy={isSearching}
          />
          <button
            type="submit"
            className="shrink-0 bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 sm:px-6"
            aria-live="polite"
          >
            {isSearching ? "Searching…" : isHero ? "Search" : "Search"}
          </button>
        </div>
      </form>

      {showHistory && onSelectHistory && (
        <div
          className={`mt-2 flex flex-wrap gap-2 ${
            isHero ? "justify-start" : "justify-center"
          }`}
        >
          {history.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSelectHistory(item)}
              className={
                isHero
                  ? "rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-gray-200 transition hover:border-red-500 hover:text-white"
                  : "rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300 transition hover:bg-gray-700 hover:text-white"
              }
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
