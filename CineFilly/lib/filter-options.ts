import type { Genre } from "@/lib/types";
import { DISCOVER_SORT_OPTIONS } from "@/lib/explore-constants";
import type { FilterOption } from "@/components/ui/FilterSelect";

export function buildGenreFilterOptions(genres: Genre[]): FilterOption[] {
  return [
    { value: "", label: "All genres" },
    ...genres.map((genre) => ({
      value: String(genre.id),
      label: genre.name,
    })),
  ];
}

export const SORT_FILTER_OPTIONS: FilterOption[] = DISCOVER_SORT_OPTIONS.map(
  (option) => ({
    value: option.value,
    label: option.label,
  })
);
