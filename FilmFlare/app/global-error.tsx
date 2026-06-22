"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 text-white">
        <h1 className="mb-2 text-2xl font-bold">Something went wrong</h1>
        <p className="mb-6 max-w-md text-center text-gray-400">
          An unexpected error occurred. Please try again.
        </p>
        {error.digest && (
          <p className="mb-4 text-xs text-gray-500">Error ID: {error.digest}</p>
        )}
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-red-600 px-6 py-2 text-white transition hover:bg-red-700"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
