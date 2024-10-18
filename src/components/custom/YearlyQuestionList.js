import parse from "html-react-parser";
import { MathJax } from "better-react-mathjax";
import { convertToWords } from "react-number-to-words";

function YearlyQuestionList({ questions, year }) {
  const longQuestions = questions.filter(
    (question) => question.type === "long"
  );
  const shortQuestions = questions.filter(
    (question) => question.type === "short"
  );
  const attemptLong = convertToWords(longQuestions.length - 1);
  const attemptShort = convertToWords(shortQuestions.length - 1);

  return (
    <div>
      <div className="flex flex-col gap-1 justify-center font-semibold">
        <h3 className="text-center">Tribhuwan University</h3>
        <h3 className="text-center">Institute of Science and Technology</h3>
        <h3 className="text-center">{year}</h3>
      </div>

      <div className="grid gap-6 sm:gap-7 mt-6">
        <h3 className="text-center underline font-semibold">Section A</h3>
        <h3 className="font-semibold">
          Attempt any {attemptLong?.toUpperCase()} questions
        </h3>
        {longQuestions.map((question, index) => (
          <div className="flex items-center gap-3" key={index}>
            <div>{question.qNum}.</div>
            <MathJax hideUntilTypeset={"first"} inline dynamic>
              <div>{parse(question?.title)}</div>
            </MathJax>
          </div>
        ))}
      </div>
      <div className="grid gap-6 sm:gap-7 mt-6">
        <h3 className="text-center underline font-semibold">Section B</h3>
        <h3 className="font-semibold">
          Attempt any {attemptShort?.toUpperCase()} questions
        </h3>
        {shortQuestions.map((question, index) => (
          <div className="flex items-center gap-3" key={index}>
            <div>{question.qNum}.</div>
            <MathJax hideUntilTypeset={"first"} inline dynamic>
              <div>{parse(question.title)}</div>
            </MathJax>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YearlyQuestionList;
