"use client";

import TypewriterComponent from "typewriter-effect";

function TypeWriter() {
  return (
    <TypewriterComponent
      options={{
        strings: [
          "Your go-to resource for CSIT notes.",
          "Access study materials anytime, anywhere.",
          "Focused on helping you succeed in CSIT.",
        ],
        autoStart: true,
        loop: true,
        delay: 6,
        wrapperClassName: "max-w-80 vs:max-w-full font-bold text-lg sm:text-xl",
      }}
    />
  );
}

export default TypeWriter;
