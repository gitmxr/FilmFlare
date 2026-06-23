import MusicCardSkeleton from "@/components/ui/skeletons/MusicCardSkeleton";

interface MusicGridSkeletonProps {
  count?: number;
}

export default function MusicGridSkeleton({ count = 8 }: MusicGridSkeletonProps) {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
      role="status"
      aria-label="Loading music"
    >
      {Array.from({ length: count }, (_, index) => (
        <MusicCardSkeleton key={index} />
      ))}
    </div>
  );
}
