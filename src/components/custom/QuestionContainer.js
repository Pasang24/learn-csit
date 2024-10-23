"use client";

import { MathJaxContext, MathJax } from "better-react-mathjax";
import { convertToWords } from "react-number-to-words";
import parse from "html-react-parser";
import { QuestionItem } from "./QuestionItem";

function QuestionContainer({ subject, questions, year }) {
  const longQuestions = questions.filter(
    (question) => question.type === "long"
  );
  const shortQuestions = questions.filter(
    (question) => question.type === "short"
  );

  const totalLongAttempt = longQuestions.length - 1;
  const totalShortAttempt = shortQuestions.length - 1;

  const attemptLong = convertToWords(totalLongAttempt);
  const attemptShort = convertToWords(totalShortAttempt);

  // each long question is 10 marks and short is 5 marks
  const fullMarks = totalLongAttempt * 10 + totalShortAttempt * 5;
  // pass marks is 40% of fullMarks;
  const passMarks = 0.4 * fullMarks;
  return (
    <MathJaxContext
      version={2}
      onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}
      config={{ showMathMenu: false, messageStyle: "none" }}
    >
      <div className="sm:border sm:p-4 rounded">
        <div className="flex flex-col gap-1 justify-center font-semibold">
          <h3 className="text-center">Tribhuwan University</h3>
          <h3 className="text-center">Institute of Science and Technology</h3>
          <h3 className="text-center">{year}</h3>
        </div>
        <div className="flex justify-between text-xs sm:text-sm">
          <div className="flex flex-col gap-2">
            <span className="capitalize">
              Bachelor Level/ {subject.semester} Semester/ Science
            </span>
            <span>B.Sc.CSIT</span>
            <span>{subject?.title}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span>Full Marks: {fullMarks}</span>
            <span>Pass Marks: {passMarks}</span>
            <span>Time: 3 hours</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-xs sm:text-sm font-semibold mt-6">
          <span className="italic">
            Candidates are required to give their answer in their own words as
            far as practicable.
          </span>
          <span>The figures in the margin indicate full marks.</span>
        </div>
        <div className="grid gap-6 sm:gap-7 mt-6">
          <h3 className="text-center underline font-semibold">Section A</h3>
          <h3 className="font-semibold">
            Attempt any {attemptLong?.toUpperCase()} questions
          </h3>
          {longQuestions.map((question, index) => (
            <QuestionItem question={question} key={index} />
          ))}
        </div>
        <div className="grid gap-6 sm:gap-7 mt-6">
          <h3 className="text-center underline font-semibold">Section B</h3>
          <h3 className="font-semibold">
            Attempt any {attemptShort?.toUpperCase()} questions
          </h3>
          {shortQuestions.map((question, index) => (
            <QuestionItem question={question} key={index} />
          ))}
        </div>
      </div>
    </MathJaxContext>
  );
}

export default QuestionContainer;
