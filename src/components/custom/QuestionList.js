"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

function QuestionList({ years, currentYear }) {
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
      id="customScrollBar"
      className={`hidden md:flex flex-col gap-3 border-r border-accent w-44 min-h-fit max-h-[calc(100vh-109px)] overflow-y-scroll ${
        isSticky ? "fixed top-3" : "absolute"
      }`}
    >
      <h3 className="font-semibold">Question Banks</h3>
      {years.map((item) => (
        <Link
          href={`${item.value}`}
          className={`font-medium text-slate-300 hover:underline ${
            item.value === currentYear ? "underline" : ""
          }`}
          key={item.value}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default QuestionList;
