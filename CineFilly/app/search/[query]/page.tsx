import type { Metadata } from "next";
import SearchResultsContent from "@/components/search/SearchResultsContent";
import { searchMulti } from "@/lib/api/tmdb";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { MultiSearchResult } from "@/lib/types";

interface SearchPageProps {
  params: Promise<{ query: string }>;
}

/** Search results refresh every 5 minutes (matches TMDB search cache). */
export const revalidate = 300;

function decodeQuery(raw: string): string {
  try {
    return decodeURIComponent(raw).trim();
  } catch {
    return raw.trim();
  }
}

export async function generateMetadata({
  params,
}: SearchPageProps): Promise<Metadata> {
  const { query } = await params;
  const decoded = decodeQuery(query);

  return buildPageMetadata({
    title: decoded ? `Search: ${decoded}` : "Search",
    description: decoded
      ? `Search results for "${decoded}" — movies, TV shows, and people on CineFilly`
      : "Search movies, TV shows, and people on CineFilly",
    path: decoded ? `/search/${encodeURIComponent(decoded)}` : undefined,
    noIndex: true,
  });
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { query } = await params;
  const decoded = decodeQuery(query);
  let results: MultiSearchResult[] = [];

  if (decoded) {
    try {
      results = await searchMulti(decoded);
    } catch {
      results = [];
    }
  }

  return <SearchResultsContent query={decoded} results={results} />;
}
