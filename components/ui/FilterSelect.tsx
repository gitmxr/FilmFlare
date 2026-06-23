"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export default function FilterSelect({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selectedLabel =
    options.find((option) => option.value === value)?.label ??
    options[0]?.label ??
    "";

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const previousOverflow = document.body.style.overflow;
    if (isMobile) {
      document.body.style.overflow = "hidden";
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative w-full min-w-0">
      <span className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full min-w-0 items-center justify-between gap-3 rounded-lg border border-white/10 bg-gray-900 px-3 py-3 text-left text-sm text-white outline-none transition hover:border-white/20 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
      >
        <span className="truncate">{selectedLabel}</span>
        <FaChevronDown
          size={12}
          className={`shrink-0 text-gray-400 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            aria-label={`Close ${label} filter`}
            onClick={() => setOpen(false)}
          />

          <div
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[min(70vh,24rem)] flex-col rounded-t-2xl border border-white/10 bg-gray-950 shadow-2xl md:absolute md:inset-x-0 md:bottom-auto md:top-full md:mt-1 md:max-h-60 md:rounded-lg"
            role="presentation"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 md:hidden">
              <p className="text-sm font-semibold text-white">{label}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <FaTimes size={14} />
              </button>
            </div>
            <ul
              id={listId}
              role="listbox"
              aria-label={label}
              className="overflow-y-auto overscroll-contain py-1"
            >
              {options.map((option) => (
                <li key={option.value || "all"} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={value === option.value}
                    className={`w-full px-4 py-3.5 text-left text-sm transition md:px-3 md:py-2.5 ${
                      value === option.value
                        ? "bg-red-600/10 font-medium text-red-400"
                        : "text-gray-200 hover:bg-white/5"
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
