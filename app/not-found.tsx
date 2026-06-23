import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Page Not Found",
  description: "The page you are looking for does not exist or may have been moved.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center text-white">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-xl text-gray-300">Page not found</p>
        <p className="mt-2 text-gray-400">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-red-600 px-6 py-2 transition duration-200 hover:bg-red-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
