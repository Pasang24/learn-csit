"use client";

import useModal from "@/hooks/useModal";
import { useState } from "react";
import ImageViewer from "./ImageViewer";
import NoteItem from "./NoteItem";
import EmptyShelf from "../illustration/EmptyShelf";

function NotesList({ notes, notesDownload }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [index, setIndex] = useState(0);
  return (
    <>
      {notes.length === 0 ? (
        <div className="flex justify-center mt-6">
          <div className="max-w-72">
            <EmptyShelf />
            <h4 className="text-center text-xl font-semibold mt-4">
              Notes Unavailable :(
            </h4>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default NotesList;
