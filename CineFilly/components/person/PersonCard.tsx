"use client";

import Image from "next/image";
import Link from "next/link";
import type { Person } from "@/lib/types";
import { PROFILE_BASE_URL } from "@/lib/types";

interface PersonCardProps {
  person: Person;
}

export default function PersonCard({ person }: PersonCardProps) {
  const imageUrl = person.profile_path
    ? `${PROFILE_BASE_URL}${person.profile_path}`
    : null;

  return (
    <Link
      href={`/person/${person.id}`}
      className="flex flex-col items-center rounded-xl bg-gray-900 p-4 text-center transition hover:bg-gray-800"
    >
      <div className="relative mb-3 aspect-square w-28 overflow-hidden rounded-full bg-gray-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={person.name}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-500">
            N/A
          </div>
        )}
      </div>
      <h2 className="text-base font-semibold text-white">{person.name}</h2>
      {person.known_for_department && (
        <p className="mt-1 text-xs text-gray-400">{person.known_for_department}</p>
      )}
    </Link>
  );
}
