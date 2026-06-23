/** TMDB discover/tv filters for regional TV & web series catalogs. */
export interface TvRegion {
  id: string;
  label: string;
  discover: Record<string, string>;
}

export const TV_REGIONS: TvRegion[] = [
  { id: "all", label: "All Regions", discover: {} },
  {
    id: "hollywood",
    label: "Hollywood / US",
    discover: { with_original_language: "en", with_origin_country: "US" },
  },
  {
    id: "british",
    label: "British",
    discover: { with_original_language: "en", with_origin_country: "GB" },
  },
  {
    id: "bollywood",
    label: "Indian (Hindi)",
    discover: { with_original_language: "hi", with_origin_country: "IN" },
  },
  {
    id: "lollywood",
    label: "Pakistani (Urdu)",
    discover: { with_original_language: "ur", with_origin_country: "PK" },
  },
  {
    id: "korean",
    label: "Korean Dramas",
    discover: { with_original_language: "ko", with_origin_country: "KR" },
  },
  {
    id: "japanese",
    label: "Japanese",
    discover: { with_original_language: "ja", with_origin_country: "JP" },
  },
  {
    id: "turkish",
    label: "Turkish",
    discover: { with_original_language: "tr", with_origin_country: "TR" },
  },
  {
    id: "spanish",
    label: "Spanish / Latin",
    discover: { with_original_language: "es" },
  },
  {
    id: "french",
    label: "French",
    discover: { with_original_language: "fr", with_origin_country: "FR" },
  },
  {
    id: "chinese",
    label: "Chinese",
    discover: { with_original_language: "zh", with_origin_country: "CN" },
  },
  {
    id: "nollywood",
    label: "Nigerian",
    discover: { with_origin_country: "NG" },
  },
];

export const DEFAULT_TV_REGION = "all";

export function getTvRegion(id: string): TvRegion | undefined {
  return TV_REGIONS.find((region) => region.id === id);
}

export function buildTvRegionQueryString(regionId: string | null): string {
  if (!regionId || regionId === "all") return "";
  const region = getTvRegion(regionId);
  if (!region) return "";

  return Object.entries(region.discover)
    .map(([key, value]) => `&${key}=${encodeURIComponent(value)}`)
    .join("");
}
