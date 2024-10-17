"use client";

import { Download, RotateCw, Maximize } from "lucide-react";
import { useEffect } from "react";
import { PhotoSlider } from "react-photo-view";
import SpinnerLoader from "../loaders/SpinnerLoader";

function ImageViewer({
  images,
  visible,
  onClose,
  index,
  onIndexChange,
  download,
}) {
  const handleFullScreenClose = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    if (visible) {
      window.addEventListener("popstate", handleFullScreenClose);
    }

    return () => {
      window.removeEventListener("popstate", handleFullScreenClose);
    };
  }, [visible]);

  return (
    <PhotoSlider
      className="select-none"
      images={images.map((item) => ({
        src: item,
        key: item,
      }))}
      visible={visible}
      onClose={() => {
        handleFullScreenClose();
        onClose();
        window.history.back();
      }}
      index={index}
      onIndexChange={onIndexChange}
      loadingElement={<SpinnerLoader />}
      speed={() => 300}
      toolbarRender={({ onRotate, rotate }) => {
        return (
          <>
            <a
              href={download}
              target="_blank"
              download={true}
              className="PhotoView-Slider__toolbarIcon"
            >
              <Download strokeWidth={2} size={22} />
            </a>
            <span
              onClick={() => onRotate(rotate + 90)}
              className="PhotoView-Slider__toolbarIcon"
            >
              <RotateCw strokeWidth={2} size={22} />
            </span>
            <span
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen();
                } else {
                  document.exitFullscreen();
                }
              }}
              className="PhotoView-Slider__toolbarIcon mr-2"
            >
              <Maximize strokeWidth={2} size={22} />
            </span>
          </>
        );
      }}
      overlayRender={() => {}}
    />
  );
}

export default ImageViewer;
