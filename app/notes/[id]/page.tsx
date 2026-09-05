import {
  dehydrate,
  HydrationBoundary,
  queryOptions,
} from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query-client";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

interface NoteDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: `Note: ${note.title}`,
    description: `${note.content.slice(0, 30)}`,
    openGraph: {
      title: `Note: ${note.title}`,
      description: `${note.content.slice(0, 30)}`,
      url: `https://notehub.com/notes/${note.id}`,
      siteName: `Note: ${note.title.slice(0, 10)}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Note: ${note.title}`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Note: ${note.title}`,
      description: `${note.content.slice(0, 30)}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = createQueryClient();

  const noteQueryOptions = queryOptions({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  await queryClient.prefetchQuery(noteQueryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
