import MediaCardSkeleton from "@/components/ui/skeletons/MediaCardSkeleton";
import Skeleton from "@/components/ui/skeletons/Skeleton";

interface CarouselSkeletonProps {
  title?: boolean;
  count?: number;
}

export default function CarouselSkeleton({
  title = true,
  count = 5,
}: CarouselSkeletonProps) {
  return (
    <section className="mt-8 sm:mt-10" role="status" aria-label="Loading carousel">
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="hidden h-8 w-32 sm:block" />
        </div>
      )}
      <div className="flex gap-4 overflow-hidden px-1">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="w-[42%] shrink-0 sm:w-[30%] md:w-[23%]">
            <MediaCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
