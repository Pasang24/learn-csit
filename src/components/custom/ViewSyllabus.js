"use client";

import ImageViewer from "./ImageViewer";
import { Button } from "../ui/button";
import { BookCopy } from "lucide-react";
import { useState } from "react";
import useModal from "@/hooks/useModal";

function ViewSyllabus({ imageUrls, downloadUrl }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [index, setIndex] = useState(0);

  return (
    <>
      <Button
        variant="outline"
        className="self-start flex gap-2 items-center"
        onClick={openModal}
      >
        <BookCopy strokeWidth={1} />
        <span>Syllabus</span>
      </Button>

      <ImageViewer
        images={imageUrls}
        download={downloadUrl}
        visible={isOpen}
        onClose={closeModal}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  );
}

export default ViewSyllabus;
