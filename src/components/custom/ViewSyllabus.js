"use client";

import ImageViewer from "./ImageViewer";
import { Button } from "../ui/button";
import { BookCopy } from "lucide-react";
import { useEffect, useState } from "react";
import { useHash } from "@/hooks/useHash";

function ViewSyllabus({ imageUrls }) {
  const hash = useHash();
  const [visible, setVisible] = useState(hash === "#sem");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setVisible(hash === "#sem");
  }, [hash]);

  return (
    <>
      <Button
        variant="outline"
        className="self-start flex gap-2 items-center"
        onClick={() => {
          window.location.hash = "#sem";
          setVisible(true);
        }}
      >
        <BookCopy strokeWidth={1} />
        <span>Preview Syllabus</span>
      </Button>

      <ImageViewer
        images={imageUrls}
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
