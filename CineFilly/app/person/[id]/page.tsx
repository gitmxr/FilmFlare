import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PersonDetailView from "@/components/person/PersonDetailView";
import { ApiError } from "@/lib/api/errors";
import { fetchPersonDetail } from "@/lib/api/tmdb";
import { PROFILE_BASE_URL } from "@/lib/types";

export const revalidate = 86400;

interface PersonDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PersonDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const { person } = await fetchPersonDetail(id);
    const imageUrl = person.profile_path
      ? `${PROFILE_BASE_URL}${person.profile_path}`
      : undefined;

    return {
      title: person.name,
      description: person.biography?.slice(0, 160),
      openGraph: {
        title: person.name,
        description: person.biography?.slice(0, 160),
        images: imageUrl ? [{ url: imageUrl }] : [],
      },
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { title: "Person Not Found" };
    }
    return { title: "Person" };
  }
}

export default async function PersonDetailPage({ params }: PersonDetailPageProps) {
  const { id } = await params;
  let data;

  try {
    data = await fetchPersonDetail(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  return <PersonDetailView data={data} />;
}
