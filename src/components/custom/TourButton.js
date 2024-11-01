"use client";

import { Button } from "../ui/button";
import { driver } from "driver.js";

function TourButton() {
  const driverObj = driver({
    showProgress: true,
    disableActiveInteraction: true,
    steps: [
      {
        popover: {
          title: "Welcome to LearnCSIT",
          description: "Welcome to LearnCSIT. Let's go for a quick tour!",
        },
      },
      {
        element: "#semesters-heading",
        popover: {
          title: "Accessing resources of Semester",
          description:
            "You can access resources of different semesters in this section",
          position: "top",
          align: "start",
        },
      },
      {
        element: "#semesters-container a:first-child",
        popover: {
          title: "Accessing respective semester resource",
          description:
            "Select the semester you want access to and you're good to go.",
        },
      },
      {
        element: "#recent-notices-heading",
        popover: {
          title: "Getting recent notices of CSIT",
          description:
            "This section provides you upto date notices related to CSIT publised by TU",
        },
      },
      {
        element: "#receent-notices-container a:first-child",
        popover: {
          title: "Accessing the notice",
          description: "Select the notice you want to access such as this one.",
        },
      },
      {
        element: "#all-noticces-btn",
        popover: {
          title: "See all notices",
          description:
            "If you want to see more then you can get all the notices related to CSIT pubished by TU by clicking this button",
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
