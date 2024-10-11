// suggested by Bishnu Dai
// this hook is used to close modal using the native back button of browser
// Note: add window.history.back() along with the closeModal() function in your closeModal handler

import { useState, useEffect } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", closeModal);
    }

    return () => {
      window.removeEventListener("popstate", closeModal);
    };
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal };
}

export default useModal;
