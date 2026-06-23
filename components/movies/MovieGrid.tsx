import type { Movie } from "@/lib/types";
import { CARD_GRID_CLASS } from "@/lib/card-layout";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <p className="py-8 text-center text-gray-400">No movies found.</p>
    );
  }

  return (
    <div className={CARD_GRID_CLASS}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
