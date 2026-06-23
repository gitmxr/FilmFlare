import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function PersonDetailLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-black">
      <LoadingSpinner label="Loading profile..." />
    </div>
  );
}
