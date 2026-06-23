import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PersonDetailView from "@/components/person/PersonDetailView";
import JsonLd from "@/components/seo/JsonLd";
import { ApiError } from "@/lib/api/errors";
import { fetchPersonDetail } from "@/lib/api/tmdb";
import {
  absoluteUrl,
  buildPageMetadata,
  truncateDescription,
} from "@/lib/seo/metadata";
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
    const description = truncateDescription(
      person.biography,
      160,
      `${person.name} — filmography, biography, and credits on CineFilly.`
    );

    return buildPageMetadata({
      title: person.name,
      description,
      path: `/person/${id}`,
      images: imageUrl ? [imageUrl] : undefined,
      type: "article",
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return buildPageMetadata({
        title: "Person Not Found",
        noIndex: true,
      });
    }
    return buildPageMetadata({ title: "Person" });
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

  const { person } = data;
  const imageUrl = person.profile_path
    ? `${PROFILE_BASE_URL}${person.profile_path}`
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    description: truncateDescription(person.biography, 300),
    image: imageUrl,
    jobTitle: person.known_for_department || undefined,
    url: absoluteUrl(`/person/${person.id}`),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PersonDetailView data={data} />
    </>
  );
}
