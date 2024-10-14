"use client";

import ChapterList from "./ChapterList";
import NotesDrawer from "./NotesDrawer";
import { useMediaQuery } from "usehooks-ts";

function ChapterMenu({ chapters, currentChapter }) {
  const isDesktopOrLaptop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });

  if (isDesktopOrLaptop)
    return <ChapterList chapters={chapters} currentChapter={currentChapter} />;
  return <NotesDrawer chapters={chapters} currentChapter={currentChapter} />;
}

export default ChapterMenu;
