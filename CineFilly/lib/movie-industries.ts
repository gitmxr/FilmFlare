/** TMDB discover filters for regional film industries with catalog coverage. */
export interface MovieIndustry {
  id: string;
  label: string;
  /** Extra discover/movie query params (without leading &). */
  discover: Record<string, string>;
}

export const MOVIE_INDUSTRIES: MovieIndustry[] = [
  { id: "all", label: "All Industries", discover: {} },
  {
    id: "hollywood",
    label: "Hollywood",
    discover: { with_original_language: "en", with_origin_country: "US" },
  },
  {
    id: "bollywood",
    label: "Bollywood",
    discover: { with_original_language: "hi", with_origin_country: "IN" },
  },
  {
    id: "lollywood",
    label: "Lollywood",
    discover: { with_original_language: "ur", with_origin_country: "PK" },
  },
  {
    id: "kollywood",
    label: "Kollywood",
    discover: { with_original_language: "ta", with_origin_country: "IN" },
  },
  {
    id: "tollywood",
    label: "Tollywood",
    discover: { with_original_language: "te", with_origin_country: "IN" },
  },
  {
    id: "mollywood",
    label: "Mollywood",
    discover: { with_original_language: "ml", with_origin_country: "IN" },
  },
  {
    id: "nollywood",
    label: "Nollywood",
    discover: { with_origin_country: "NG" },
  },
  {
    id: "korean",
    label: "Korean Cinema",
    discover: { with_original_language: "ko", with_origin_country: "KR" },
  },
  {
    id: "japanese",
    label: "Japanese Cinema",
    discover: { with_original_language: "ja", with_origin_country: "JP" },
  },
  {
    id: "british",
    label: "British Cinema",
    discover: { with_original_language: "en", with_origin_country: "GB" },
  },
  {
    id: "chinese",
    label: "Chinese Cinema",
    discover: { with_original_language: "zh", with_origin_country: "CN" },
  },
  {
    id: "french",
    label: "French Cinema",
    discover: { with_original_language: "fr", with_origin_country: "FR" },
  },
  {
    id: "spanish",
    label: "Spanish Cinema",
    discover: { with_original_language: "es", with_origin_country: "ES" },
  },
];

export const DEFAULT_MOVIE_INDUSTRY = "all";

export function getMovieIndustry(id: string): MovieIndustry | undefined {
  return MOVIE_INDUSTRIES.find((industry) => industry.id === id);
}

export function buildIndustryQueryString(industryId: string | null): string {
  if (!industryId || industryId === "all") return "";
  const industry = getMovieIndustry(industryId);
  if (!industry) return "";

  return Object.entries(industry.discover)
    .map(([key, value]) => `&${key}=${encodeURIComponent(value)}`)
    .join("");
}
