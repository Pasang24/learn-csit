"use client";

import Container from "./Container";
import SelectMenu from "./SelectMenu";
import SpinnerLoader from "../loaders/SpinnerLoader";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import YearlyQuestionList from "./YearlyQuestionList";
import { MathJaxContext } from "better-react-mathjax";

function QuestionContainer({ yearData, unitData, fetchQuestions }) {
  const [filter, setFilter] = useState("Year");
  const [year, setYear] = useState(yearData[0]?.value);
  const [unit, setUnit] = useState(unitData[0]?.value);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  const params = useParams();

  const isYear = filter === "Year";

  useEffect(() => {
    setLoading(true);
    fetchQuestions(params.subject, isYear, year, unit)
      .then((data) => {
        setQuestions(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter, year, unit]);

  return (
    <div className="flex justify-center">
      <Container className="flex flex-col">
        <div className="flex flex-col gap-4 items-stretch vs:flex-row vs:gap-0 justify-between mb-6">
          <SelectMenuContainer
            title={"Filter By:"}
            items={[
              { name: "Year", value: "Year" },
              { name: "Unit", value: "Unit" },
            ]}
            defaultValue={filter}
            onChange={(value) => setFilter(value)}
          />

          {isYear ? (
            <SelectMenuContainer
              title={"Select Year:"}
              items={yearData}
              defaultValue={year}
              onChange={(value) => setYear(value)}
            />
          ) : (
            <SelectMenuContainer
              title={"Select Unit:"}
              items={unitData}
              defaultValue={unit}
              onChange={(value) => setUnit(value)}
            />
          )}
        </div>
        {!loading && (
          <div className="self-center max-w-4xl sm:border sm:rounded sm:p-3">
            <MathJaxContext>
              {isYear ? (
                <YearlyQuestionList year={year} questions={questions} />
              ) : null}
            </MathJaxContext>
          </div>
        )}
      </Container>
    </div>
  );
}

const SelectMenuContainer = ({ title, items, defaultValue, onChange }) => {
  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
      <h4 className="text-sm font-semibold">{title}</h4>
      <SelectMenu
        className={"w-full vs:w-[180px]"}
        items={items}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

export default QuestionContainer;
