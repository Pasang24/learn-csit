import React, { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

function NoteItem({ note, onClick, noteNum }) {
  const [showImage, setShowImage] = useState(false);

  return (
    <button
      onClick={onClick}
      className="bg-accent flex justify-center items-center aspect-square overflow-hidden relative"
    >
      <Skeleton
        className={`w-full h-full absolute ${showImage ? "opacity-0" : ""}`}
      />

      <Image
        className={`w-full h-full object-cover cursor-pointer opacity-0 hover:scale-110 select-none ${
          showImage ? "opacity-100" : ""
        }`}
        style={{ transition: "0.3s all ease" }}
        width={500}
        height={500}
        src={note}
        alt={`Page ${noteNum}`}
        draggable={false}
        onLoad={() => setShowImage(true)}
      />
    </button>
  );
}

export default NoteItem;
