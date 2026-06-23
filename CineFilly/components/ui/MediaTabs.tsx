"use client";

interface MediaTabsProps<T extends string> {
  tabs: { value: T; label: string }[];
  active: T;
  onChange: (value: T) => void;
  className?: string;
}

export default function MediaTabs<T extends string>({
  tabs,
  active,
  onChange,
  className = "",
}: MediaTabsProps<T>) {
  return (
    <div
      className={`inline-flex rounded-full border border-gray-700 bg-gray-900 p-1 ${className}`}
      role="tablist"
      aria-label="Media type"
    >
      {tabs.map(({ value, label }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              isActive
                ? "bg-red-600 text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
