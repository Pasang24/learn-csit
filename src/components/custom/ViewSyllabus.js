"use client";

import ImageViewer from "./ImageViewer";
import { Button } from "../ui/button";
import { BookCopy } from "lucide-react";
import { useEffect, useState } from "react";
import { useHash } from "@/hooks/useHash";

function ViewSyllabus({ imageUrls, downloadUrl }) {
  const hash = useHash();
  const [visible, setVisible] = useState(hash === "#syllabus");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setVisible(hash === "#syllabus");
  }, [hash]);

  return (
    <>
      <Button
        variant="outline"
        className="self-start flex gap-2 items-center"
        onClick={() => {
          window.location.hash = "#syllabus";
          setVisible(true);
        }}
      >
        <BookCopy strokeWidth={1} />
        <span>Syllabus</span>
      </Button>

      <ImageViewer
        images={imageUrls}
        download={downloadUrl}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        index={index}
        onIndexChange={setIndex}
      />
    </>
  );
}

export default ViewSyllabus;
