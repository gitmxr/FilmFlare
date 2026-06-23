import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MediaCarouselSection from "@/components/media/MediaCarouselSection";
import type { PersonDetailData } from "@/lib/types";
import { PROFILE_BASE_URL } from "@/lib/types";

interface PersonDetailViewProps {
  data: PersonDetailData;
}

export default function PersonDetailView({ data }: PersonDetailViewProps) {
  const { person, movieCredits, tvCredits } = data;
  const imageUrl = person.profile_path
    ? `${PROFILE_BASE_URL}${person.profile_path}`
    : null;

  return (
    <div className="min-h-screen bg-black p-4 text-white sm:p-6">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "People", href: "/search/actors" },
            { label: person.name },
          ]}
        />

        <div className="flex flex-col gap-6 md:flex-row">
          <div className="mx-auto w-full max-w-xs md:mx-0 md:w-1/3">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-800 shadow-lg">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={person.name}
                  fill
                  sizes="(max-width: 768px) 80vw, 33vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  No Photo
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-yellow-400">{person.name}</h1>
            {person.known_for_department && (
              <p className="mt-2 text-gray-400">{person.known_for_department}</p>
            )}
            {person.birthday && (
              <p className="mt-4 text-sm text-gray-300">
                <span className="font-semibold">Birthday:</span> {person.birthday}
              </p>
            )}
            {person.place_of_birth && (
              <p className="mt-1 text-sm text-gray-300">
                <span className="font-semibold">Place of Birth:</span>{" "}
                {person.place_of_birth}
              </p>
            )}
            {person.also_known_as?.length > 0 && (
              <p className="mt-2 text-sm text-gray-300">
                <span className="font-semibold">Also Known As:</span>{" "}
                {person.also_known_as.join(", ")}
              </p>
            )}
            {person.biography && (
              <div className="mt-6">
                <h2 className="mb-2 text-xl font-semibold">Biography</h2>
                <p className="whitespace-pre-line text-sm leading-relaxed text-gray-300 sm:text-base">
                  {person.biography}
                </p>
              </div>
            )}
          </div>
        </div>

        {movieCredits.length > 0 && (
          <div className="mt-10">
            <MediaCarouselSection
              title="Movie Credits"
              items={movieCredits.map((credit) => ({
                id: credit.id,
                title: credit.title ?? "Unknown",
                overview: "",
                poster_path: credit.poster_path,
                backdrop_path: null,
                release_date: credit.release_date ?? "",
                vote_average: credit.vote_average,
                vote_count: 0,
              }))}
              mediaType="movie"
            />
          </div>
        )}

        {tvCredits.length > 0 && (
          <div className="mt-10">
            <MediaCarouselSection
              title="TV Credits"
              items={tvCredits.map((credit) => ({
                id: credit.id,
                name: credit.name ?? "Unknown",
                overview: "",
                poster_path: credit.poster_path,
                backdrop_path: null,
                first_air_date: credit.first_air_date ?? "",
                vote_average: credit.vote_average,
                vote_count: 0,
              }))}
              mediaType="tv"
            />
          </div>
        )}

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1 rounded bg-red-600 px-4 py-2 text-sm transition hover:bg-red-700"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
