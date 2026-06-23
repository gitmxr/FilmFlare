import type { Movie, MoviePageParam } from "@/lib/types";
import { CARD_SECTION_TITLE_CLASS } from "@/lib/card-layout";
import MovieGrid from "./MovieGrid";
import PaginationButtons from "./PaginationButtons";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  page: number;
  param: MoviePageParam;
  onPageChange: (param: MoviePageParam, page: number) => void;
  isPending?: boolean;
}

export default function MovieSection({
  title,
  movies,
  page,
  param,
  onPageChange,
  isPending = false,
}: MovieSectionProps) {
  return (
    <section className="mt-8 sm:mt-10">
      <div className="mb-4 w-full text-left">
        <h2 className={CARD_SECTION_TITLE_CLASS}>{title}</h2>
      </div>
      <MovieGrid movies={movies} />
      <PaginationButtons
        page={page}
        param={param}
        onPageChange={onPageChange}
        isPending={isPending}
        hasNextPage={movies.length > 0}
      />
    </section>
  );
}
