import Skeleton from "@/components/ui/skeletons/Skeleton";

export default function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden" aria-label="Loading hero">
      <Skeleton className="min-h-[280px] w-full rounded-none sm:min-h-[360px] lg:min-h-[420px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 z-10 mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10">
        <Skeleton className="mb-2 h-4 w-32" />
        <Skeleton className="h-10 w-full max-w-2xl sm:h-12" />
        <Skeleton className="mt-3 h-5 w-full max-w-xl" />
        <Skeleton className="mt-6 h-12 w-full max-w-xl rounded-full sm:mt-8" />
        <div className="mt-5 flex gap-3">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>
      </div>
    </section>
  );
}
