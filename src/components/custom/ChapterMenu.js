"use client";

import ChapterList from "./ChapterList";
import NotesDrawer from "./NotesDrawer";
import { useMediaQuery } from "usehooks-ts";

function ChapterMenu() {
  const isDesktopOrLaptop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });

  if (isDesktopOrLaptop) return <ChapterList />;
  return <NotesDrawer />;
}

export default ChapterMenu;
