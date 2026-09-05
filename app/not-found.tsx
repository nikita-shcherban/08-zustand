"use client";

import { useEffect } from "react";
import css from "./Home.module.css";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "This page does not exist or has been moved.",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "This page does not exist or has been moved.",
    url: "https://notehub.com",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 - Page not found | NoteHub",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "404 - Page not found | NoteHub",
    description: "This page does not exist or has been moved.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // Редірект через 3 секунди
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
