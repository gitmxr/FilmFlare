import HeroSkeleton from "@/components/ui/skeletons/HeroSkeleton";
import CarouselSkeleton from "@/components/ui/skeletons/CarouselSkeleton";
import Skeleton from "@/components/ui/skeletons/Skeleton";

export default function HomeHubSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white" role="status" aria-label="Loading home">
      <HeroSkeleton />
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 sm:pt-8">
        <Skeleton className="mb-4 h-7 w-48" />
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-32 rounded-xl" />
          ))}
        </div>
        <CarouselSkeleton />
        <CarouselSkeleton />
        <CarouselSkeleton />
        <CarouselSkeleton />
      </div>
    </div>
  );
}
