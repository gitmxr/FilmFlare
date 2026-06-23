import MediaGridSkeleton from "@/components/ui/skeletons/MediaGridSkeleton";
import Skeleton from "@/components/ui/skeletons/Skeleton";

interface BrowsePageSkeletonProps {
  showIndustryFilter?: boolean;
  showRegionFilter?: boolean;
}

export default function BrowsePageSkeleton({
  showIndustryFilter = false,
  showRegionFilter = false,
}: BrowsePageSkeletonProps) {
  const filterCount =
    showIndustryFilter || showRegionFilter ? 3 : 2;

  return (
    <div
      className="min-h-screen bg-black px-4 pb-20 pt-6 text-white sm:px-6"
      role="status"
      aria-label="Loading browse page"
    >
      <div className="mx-auto max-w-7xl">
        <Skeleton className="mb-2 h-4 w-28" />
        <Skeleton className="h-9 w-40 sm:h-10" />
        <Skeleton className="mt-2 h-4 w-full max-w-2xl" />
        <div
          className={`mb-8 mt-8 grid gap-4 sm:grid-cols-2 ${filterCount === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}
        >
          <Skeleton className="h-12 rounded-lg" />
          {(showIndustryFilter || showRegionFilter) && (
            <Skeleton className="h-12 rounded-lg" />
          )}
          <Skeleton className="h-12 rounded-lg sm:col-span-2 lg:col-span-1" />
        </div>
        <MediaGridSkeleton count={12} />
      </div>
    </div>
  );
}
