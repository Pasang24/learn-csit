"use client";

import Image from "next/image";
import useModal from "@/hooks/useModal";
import { useState } from "react";
import ImageViewer from "./ImageViewer";

function NotesList({ notes, notesDownload }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className="grid grid-cols-3 vs:grid-cols-4 lg:grid-cols-5 gap-2">
        {notes.map((note, index) => (
          <div
            onClick={() => {
              setIndex(index);
              openModal();
            }}
            className="bg-accent flex justify-center items-center aspect-square overflow-hidden"
            key={index}
          >
            <Image
              className="w-full h-full object-cover cursor-pointer hover:scale-110"
              style={{ transition: "0.3s all ease" }}
              width={500}
              height={500}
              src={note}
              alt={`Page ${index + 1}`}
              key={index}
            />
          </div>
        ))}
      </div>
      <ImageViewer
        images={notes}
        download={notesDownload}
        visible={isOpen}
        onClose={closeModal}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  );
}

export default NotesList;
