"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

function ChapterList() {
  const listRef = useRef(null);
  const listTopRef = useRef(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const listMenu = listRef.current;
    if (listMenu) {
      // Calculate the initial top position of the listMenu relative to the document
      // We add window.scrollY to account for any initial scroll position
      listTopRef.current =
        listMenu.getBoundingClientRect().top + window.scrollY;
    }
    // Function to handle scroll events
    const handleScroll = () => {
      const listMenu = listRef.current;
      if (listMenu) {
        // Get the current scroll position
        const scrollTop = window.scrollY;
        // Set isSticky to true if we've scrolled past the listMenu's initial position
        setIsSticky(scrollTop > listTopRef.current - 10);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={listRef}
      id="chapterList"
      className={`hidden md:flex flex-col gap-3 border-r border-accent w-56 min-h-fit max-h-[calc(100vh-109px)] overflow-y-scroll ${
        isSticky ? "fixed top-3" : "absolute"
      }`}
    >
      <h3 className="font-semibold">Chapters</h3>
      <Link href={"/"} className="font-medium text-slate-300 hover:underline">
        Introduction to Computer
      </Link>
      <Link href={"/"} className="font-medium text-slate-300 hover:underline">
        The Computer System Hardware
      </Link>
      <Link href={"/"} className="font-medium text-slate-300 hover:underline">
        Computer Memory
      </Link>
      <Link href={"/"} className="font-medium text-slate-300 hover:underline">
        Input and Output Devices
      </Link>
      <Link href={"/"} className="font-medium text-slate-300 hover:underline">
        Data Representation
      </Link>
    </div>
  );
}

export default ChapterList;
