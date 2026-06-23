import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function TVDetailLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-black">
      <LoadingSpinner label="Loading TV show..." />
    </div>
  );
}
