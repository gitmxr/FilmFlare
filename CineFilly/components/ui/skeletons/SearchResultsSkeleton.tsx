import MediaGridSkeleton from "@/components/ui/skeletons/MediaGridSkeleton";
import Skeleton from "@/components/ui/skeletons/Skeleton";

export default function SearchResultsSkeleton() {
  return (
    <div
      className="min-h-screen bg-black px-4 pb-20 pt-6 text-white sm:px-6"
      role="status"
      aria-label="Loading search results"
    >
      <div className="mx-auto max-w-7xl">
        <Skeleton className="mb-2 h-9 w-56" />
        <Skeleton className="mb-8 h-5 w-72" />
        <Skeleton className="mb-4 h-8 w-32" />
        <MediaGridSkeleton count={8} />
        <Skeleton className="mb-4 mt-10 h-8 w-36" />
        <MediaGridSkeleton count={4} />
      </div>
    </div>
  );
}
