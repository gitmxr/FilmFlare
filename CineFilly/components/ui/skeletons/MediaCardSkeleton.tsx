import Skeleton from "@/components/ui/skeletons/Skeleton";

export default function MediaCardSkeleton() {
  return (
    <div className="flex h-full w-full flex-col items-center rounded-xl bg-gray-900 p-3">
      <Skeleton className="aspect-[2/3] w-full rounded-lg" />
      <Skeleton className="mt-3 h-4 w-3/4" />
      <Skeleton className="mt-2 h-3 w-1/2" />
    </div>
  );
}
