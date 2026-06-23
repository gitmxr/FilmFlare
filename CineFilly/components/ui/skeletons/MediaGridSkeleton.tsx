import { CARD_GRID_CLASS } from "@/lib/card-layout";
import MediaCardSkeleton from "@/components/ui/skeletons/MediaCardSkeleton";

interface MediaGridSkeletonProps {
  count?: number;
  className?: string;
}

export default function MediaGridSkeleton({
  count = 8,
  className,
}: MediaGridSkeletonProps) {
  return (
    <div
      className={className ?? CARD_GRID_CLASS}
      role="status"
      aria-label="Loading content"
    >
      {Array.from({ length: count }, (_, index) => (
        <MediaCardSkeleton key={index} />
      ))}
    </div>
  );
}
