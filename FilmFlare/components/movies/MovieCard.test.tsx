import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import MovieCard from "@/components/movies/MovieCard";
import type { Movie } from "@/lib/types";

const movie: Movie = {
  id: 550,
  title: "Fight Club",
  overview: "An insomniac office worker...",
  poster_path: "/abc.jpg",
  backdrop_path: null,
  release_date: "1999-10-15",
  vote_average: 8.4,
  vote_count: 30000,
};

describe("MovieCard", () => {
  it("renders movie title and rating", () => {
    render(<MovieCard movie={movie} />);

    expect(screen.getByText("Fight Club")).toBeInTheDocument();
    expect(screen.getByText(/8\.4/)).toBeInTheDocument();
    expect(screen.getByText("1999")).toBeInTheDocument();
  });

  it("links to the movie detail page", () => {
    render(<MovieCard movie={movie} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/550");
  });

  it("shows fallback when poster is missing", () => {
    render(<MovieCard movie={{ ...movie, poster_path: null }} />);
    expect(screen.getByText("No Image")).toBeInTheDocument();
  });
});
