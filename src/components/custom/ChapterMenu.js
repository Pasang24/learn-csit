"use client";

import NotesButton from "./NotesButton";
import ChapterList from "./ChapterList";
import { useMediaQuery } from "usehooks-ts";

function ChapterMenu() {
  const isDesktopOrLaptop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });

  if (isDesktopOrLaptop) return <ChapterList />;
  return <NotesButton />;
}

export default ChapterMenu;
