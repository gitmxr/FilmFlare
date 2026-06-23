import CarouselSkeleton from "@/components/ui/skeletons/CarouselSkeleton";
import Skeleton from "@/components/ui/skeletons/Skeleton";

export default function MusicLoading() {
  return (
    <div
      className="min-h-screen bg-black text-white"
      role="status"
      aria-label="Loading music"
    >
      <div className="mx-auto max-w-7xl px-4 pb-4 pt-4 sm:px-6 sm:pt-6">
        <Skeleton className="mx-auto h-12 max-w-xl rounded-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <CarouselSkeleton />
        <CarouselSkeleton />
        <CarouselSkeleton />
      </div>
    </div>
  );
}
