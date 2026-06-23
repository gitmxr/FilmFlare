import Skeleton from "@/components/ui/skeletons/Skeleton";
import MusicGridSkeleton from "@/components/ui/skeletons/MusicGridSkeleton";

export default function MusicDetailSkeleton() {
  return (
    <div
      className="min-h-screen bg-black text-white"
      role="status"
      aria-label="Loading music"
    >
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 sm:pt-6">
        <Skeleton className="mb-4 h-4 w-48" />
        <Skeleton className="mb-6 h-8 w-28" />
        <Skeleton className="mb-2 h-8 w-3/4 max-w-xl" />
        <Skeleton className="mb-4 h-4 w-40" />
        <Skeleton className="mb-10 aspect-video w-full rounded-lg" />
        <Skeleton className="mb-4 h-8 w-48" />
        <MusicGridSkeleton count={4} />
      </div>
    </div>
  );
}
