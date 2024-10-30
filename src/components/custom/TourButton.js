"use client";

import { Button } from "../ui/button";
import { driver } from "driver.js";

function TourButton() {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: "#tour-btn",
        popover: {
          title: "Tour Demo",
          description: "This is the tour button and this is a tour demo.",
        },
      },
      {
        element: "#semesters-container",
        popover: {
          title: "Accessing resources of Semester",
          description:
            "You can access resources of different semesters by selecting any it from here",
        },
      },
    ],
  });
  return (
    <Button
      onClick={() => driverObj.drive()}
      className="font-semibold text-black text-base"
      id="tour-btn"
    >
      Get Started
    </Button>
  );
}

export default TourButton;
