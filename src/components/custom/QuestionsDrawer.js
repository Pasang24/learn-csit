"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LayoutList } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";
import { useEffect, useState } from "react";

function QuestionsDrawer({ years, currentYear }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const controlButton = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlButton);

    return () => {
      window.removeEventListener("scroll", controlButton);
    };
  }, [lastScrollY]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={() => {
        if (isOpen) {
          closeModal();
          window.history.back();
        } else {
          openModal();
        }
      }}
    >
      <DrawerTrigger asChild>
        <button
          className={`fixed z-10 bottom-6 right-6 bg-[#1d1d22] w-16 h-16 grid place-items-center rounded-full p-4 border shadow-md shadow-black md:hidden transition-transform duration-300 ease-in-out ${
            isVisible ? "translate-y-0" : "translate-y-24"
          }`}
        >
          <LayoutList />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>Question Banks</DrawerTitle>
          <DrawerDescription>Select a Question Bank</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="max-h-[calc(100vh-106px)] overflow-y-scroll">
          {years.map((item) => (
            <Button
              onClick={() => router.replace(`${item.value}`)}
              variant="outline"
              className={`text-slate-300 justify-start p-6 ${
                item.value === currentYear ? "bg-accent" : ""
              }`}
              key={item.value}
            >
              {item.name}
            </Button>
          ))}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default QuestionsDrawer;
