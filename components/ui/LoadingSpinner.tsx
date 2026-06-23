interface LoadingSpinnerProps {
  label?: string;
}

export default function LoadingSpinner({
  label = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-red-600"
        role="status"
        aria-label={label}
      />
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}
