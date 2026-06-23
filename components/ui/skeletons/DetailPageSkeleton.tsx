import Skeleton from "@/components/ui/skeletons/Skeleton";
import CarouselSkeleton from "@/components/ui/skeletons/CarouselSkeleton";

export default function DetailPageSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white" role="status" aria-label="Loading details">
      <Skeleton className="h-48 w-full rounded-none sm:h-64 md:h-80" />
      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <Skeleton className="mb-4 h-4 w-48" />
        <Skeleton className="mb-6 h-8 w-28" />
        <div className="-mt-10 flex flex-col gap-6 sm:-mt-16 sm:gap-8 md:flex-row">
          <div className="w-full md:w-1/3">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          </div>
          <div className="flex-1 space-y-4">
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[83%]" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-4 pt-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Skeleton className="mb-4 h-48 w-full rounded-lg" />
        </div>
        <CarouselSkeleton title count={4} />
      </div>
    </div>
  );
}
