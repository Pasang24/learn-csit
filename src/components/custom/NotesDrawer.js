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
import useModal from "@/hooks/useModal";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function NotesDrawer({ chapters, currentChapter }) {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
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
        <button className="fixed bottom-6 right-6 bg-[#1d1d22] w-16 h-16 grid place-items-center rounded-full p-4 border shadow-md shadow-black md:hidden">
          <LayoutList />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>Chapters</DrawerTitle>
          <DrawerDescription>Select a Chapter</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="max-h-[calc(100vh-106px)] overflow-y-scroll">
          {chapters.map((chapter) => (
            <Button
              onClick={() => router.replace(`${chapter.unit}`)}
              variant="outline"
              className={`text-slate-300 justify-start p-6 ${
                chapter.unit === currentChapter ? "bg-accent" : ""
              }`}
              key={chapter.title}
            >
              {chapter.title}
            </Button>
          ))}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default NotesDrawer;
