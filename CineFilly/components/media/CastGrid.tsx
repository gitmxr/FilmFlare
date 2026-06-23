import Image from "next/image";
import Link from "next/link";
import type { CastMember } from "@/lib/types";
import { PROFILE_BASE_URL } from "@/lib/types";

interface CastGridProps {
  cast: CastMember[];
  title?: string;
}

export default function CastGrid({ cast, title = "Cast" }: CastGridProps) {
  if (cast.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="mb-4 border-l-4 border-red-600 pl-4 text-2xl font-bold text-white sm:text-3xl">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {cast.map((member) => {
          const imageUrl = member.profile_path
            ? `${PROFILE_BASE_URL}${member.profile_path}`
            : null;

          return (
            <Link
              key={member.id}
              href={`/person/${member.id}`}
              className="rounded-xl bg-gray-900 p-3 text-center transition hover:bg-gray-800"
            >
              <div className="relative mx-auto mb-3 aspect-square w-24 overflow-hidden rounded-full bg-gray-800">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={member.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-500">
                    N/A
                  </div>
                )}
              </div>
              <p className="text-sm font-semibold text-white">{member.name}</p>
              <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                {member.character}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
