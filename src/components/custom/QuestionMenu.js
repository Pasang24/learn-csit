"use client";

import { useMediaQuery } from "usehooks-ts";
import QuestionsDrawer from "./QuestionsDrawer";
import QuestionList from "./QuestionList";

function QuestionMenu({ years, currentYear }) {
  const isDesktopOrLaptop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });
  if (isDesktopOrLaptop)
    return <QuestionList years={years} currentYear={currentYear} />;
  return <QuestionsDrawer years={years} currentYear={currentYear} />;
}

export default QuestionMenu;
