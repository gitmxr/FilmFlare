import Skeleton from "@/components/ui/skeletons/Skeleton";
import CarouselSkeleton from "@/components/ui/skeletons/CarouselSkeleton";

export default function PersonDetailSkeleton() {
  return (
    <div
      className="min-h-screen bg-black p-4 text-white sm:p-6"
      role="status"
      aria-label="Loading profile"
    >
      <div className="mx-auto max-w-5xl">
        <Skeleton className="mb-6 h-4 w-56" />
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="mx-auto w-full max-w-xs md:mx-0 md:w-1/3">
            <Skeleton className="aspect-square w-full rounded-2xl" />
          </div>
          <div className="flex-1 space-y-3">
            <Skeleton className="h-9 w-2/3" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </div>
        <CarouselSkeleton title count={4} />
        <CarouselSkeleton title count={4} />
      </div>
    </div>
  );
}
