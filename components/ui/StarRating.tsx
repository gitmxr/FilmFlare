import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  className?: string;
  size?: "sm" | "md";
}

export default function StarRating({
  rating,
  className = "",
  size = "sm",
}: StarRatingProps) {
  const textClass = size === "md" ? "text-base" : "text-sm";
  const iconClass = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";

  return (
    <span
      className={`inline-flex items-center justify-center gap-1 text-yellow-400 ${textClass} ${className}`}
      aria-label={`Rating ${rating.toFixed(1)} out of 10`}
    >
      <FaStar className={iconClass} aria-hidden />
      <span>{rating.toFixed(1)} / 10</span>
    </span>
  );
}
