import {
  defaultShouldDehydrateQuery,
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type NotesProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug && slug.length > 0 ? slug[0] : "all";
  const apiTag = tag === "all" ? "All tags" : tag;

  return {
    title: `Notes - ${apiTag}`,
    description: `Browse notes tagged with ${apiTag}. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
    openGraph: {
      title: `Notes - ${apiTag}`,
      description: `Browse notes tagged with ${apiTag}. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
      url: `https://notehub.com/notes/filter/${apiTag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Notes - ${apiTag}`,
      description: `Browse notes tagged with ${apiTag}. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NotesPage({ params }: NotesProps) {
  const { slug } = await params;

  const tag = slug && slug.length > 0 ? slug[0] : "all";
  const apiTag = tag === "all" ? undefined : tag;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });

  const initialPage = 1;
  const initialSearch = "";
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ["notes", initialPage, initialSearch, { tag }],
    queryFn: () =>
      fetchNotes({
        page: initialPage,
        perPage,
        search: initialSearch,
        tag: apiTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
