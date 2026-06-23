import Image from "next/image";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; href: string };
}

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-gray-900/50 px-6 py-14 text-center">
      <div className="relative mb-6 h-32 w-32 opacity-80">
        <Image
          src="/images/no-results.svg"
          alt=""
          fill
          className="object-contain"
          aria-hidden
        />
      </div>
      <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
      {description && (
        <p className="mt-2 max-w-md text-sm text-gray-400">{description}</p>
      )}
      {action && (
        <Link
          href={action.href}
          className="mt-6 rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
