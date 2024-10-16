"use client";

import { useEffect, useState } from "react";
import Container from "./Container";
import SelectMenu from "./SelectMenu";

function QuestionContainer({ yearData, unitData }) {
  const [filter, setFilter] = useState("Year");
  const [year, setYear] = useState(yearData[0]?.value);
  const [unit, setUnit] = useState(unitData[0]?.value);

  const isYear = filter === "Year";

  return (
    <div className="flex justify-center">
      <Container>
        <div className="flex flex-col gap-4 items-stretch vs:flex-row vs:gap-0 justify-between mb-6">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
            <h4 className="text-sm font-semibold">Filter By:</h4>
            <SelectMenu
              className={"w-full vs:w-[180px]"}
              items={[
                { name: "Year", value: "Year" },
                { name: "Unit", value: "Unit" },
              ]}
              defaultValue={filter}
              onChange={(value) => setFilter(value)}
            />
          </div>
          {isYear ? (
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
              <h4 className="text-sm font-semibold">Select Year:</h4>
              <SelectMenu
                className={"w-full vs:w-[180px]"}
                items={yearData}
                defaultValue={year}
                onChange={(value) => setYear(value)}
              />
            </div>
          ) : (
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
              <h4 className="text-sm font-semibold">Select Unit:</h4>
              <SelectMenu
                className={"w-full vs:w-[180px]"}
                items={unitData}
                defaultValue={unit}
                onChange={(value) => setUnit(value)}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-center text-2xl font-semibold mt-12">
            Questions coming soon!!
          </h3>
        </div>
      </Container>
    </div>
  );
}

export default QuestionContainer;
