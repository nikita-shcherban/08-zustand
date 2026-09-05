import { NoteForm } from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create New Note | NoteHub",
  description:
    "Quickly create a new note in Notehub - the efficient app for orginizing your thoughts and ideas.",
  openGraph: {
    title: "Create New Note | NoteHub",
    description:
      "Quickly create a new note in Notehub - the efficient app for orginizing your thoughts and ideas.",
    url: "https://notehub.com/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Create Note",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create New Note | NoteHub",
    description:
      "Quickly create a new note in Notehub - the efficient app for orginizing your thoughts and ideas.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
