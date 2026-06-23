import type { Movie } from "@/lib/types";
import MediaCard from "@/components/media/MediaCard";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return <MediaCard item={movie} mediaType="movie" />;
}
