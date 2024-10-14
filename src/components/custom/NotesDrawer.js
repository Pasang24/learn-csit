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

function NotesDrawer() {
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
          <Button
            onClick={() =>
              router.replace(
                "/semester/first/Introduction-to-Information-Technology/1"
              )
            }
            variant="outline"
            className="text-slate-300 justify-start p-6"
          >
            Introduction to Computer
          </Button>
          <Button
            onClick={() =>
              router.replace(
                "/semester/first/Introduction-to-Information-Technology/2"
              )
            }
            variant="outline"
            className="text-slate-300 justify-start p-6"
          >
            The Computer System Hardware
          </Button>
          <Button
            onClick={() => router.replace("/")}
            variant="outline"
            className="text-slate-300 justify-start p-6"
          >
            Computer Memory
          </Button>
          <Button
            onClick={() => router.replace("/")}
            variant="outline"
            className="text-slate-300 justify-start p-6"
          >
            Input and Output Devices
          </Button>
          <Button
            onClick={() => router.replace("/")}
            variant="outline"
            className="text-slate-300 justify-start p-6"
          >
            Data Representation
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default NotesDrawer;
