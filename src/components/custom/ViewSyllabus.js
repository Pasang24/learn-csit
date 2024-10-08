"use client";

import { PhotoProvider, PhotoView } from "react-photo-view";
import { Button } from "../ui/button";
import { BookCopy } from "lucide-react";

function ViewSyllabus({ imageUrls }) {
  return (
    <PhotoProvider>
      {imageUrls.map((url, index) => {
        return index < 1 ? (
          <PhotoView src={url} key={index}>
            <Button
              variant="outline"
              className="self-start flex gap-2 items-center"
            >
              <BookCopy strokeWidth={1} />
              <span>Preview Syllabus</span>
            </Button>
          </PhotoView>
        ) : (
          <PhotoView src={url} key={index} />
        );
      })}
    </PhotoProvider>
  );
}

export default ViewSyllabus;
