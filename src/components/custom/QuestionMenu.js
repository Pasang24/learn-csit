"use client";

import { useMediaQuery } from "usehooks-ts";
import QuestionsDrawer from "./QuestionsDrawer";

function QuestionMenu({ years, currentYear }) {
  const isDesktopOrLaptop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });
  if (isDesktopOrLaptop) return <div>Desktop View</div>;
  return <QuestionsDrawer years={years} currentYear={currentYear} />;
}

export default QuestionMenu;
