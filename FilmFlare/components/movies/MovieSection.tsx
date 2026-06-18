import type { Movie, MoviePageParam } from "@/lib/types";
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
    <section className="mt-8">
      <div className="mb-4 w-full text-left">
        <h2 className="border-l-4 border-red-600 pl-4 text-2xl font-bold text-white sm:text-3xl">
          {title}
        </h2>
      </div>
      <MovieGrid movies={movies} />
      <PaginationButtons
        page={page}
        param={param}
        onPageChange={onPageChange}
        isPending={isPending}
      />
    </section>
  );
}
