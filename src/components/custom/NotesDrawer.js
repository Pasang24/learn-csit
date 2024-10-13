"use client";

import {
  Drawer,
  DrawerClose,
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
        <LayoutList />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Chapters</DrawerTitle>
          <DrawerDescription>Select a Chapter</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="max-h-[calc(100vh-106px)] overflow-y-scroll">
          <Button
            onClick={() => router.replace("/")}
            variant="outline"
            className="text-slate-300 justify-start p-6"
          >
            Introduction to Computer
          </Button>
          <Button
            onClick={() => router.replace("/")}
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
