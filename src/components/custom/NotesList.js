"use client";

import useModal from "@/hooks/useModal";
import { useState } from "react";
import ImageViewer from "./ImageViewer";
import NoteItem from "./NoteItem";

function NotesList({ notes, notesDownload }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className="grid grid-cols-3 vs:grid-cols-4 lg:grid-cols-5 gap-2">
        {notes.map((note, index) => (
          <NoteItem
            note={note}
            onClick={() => {
              setIndex(index);
              openModal();
            }}
            noteNum={index + 1}
            key={note}
          />
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
