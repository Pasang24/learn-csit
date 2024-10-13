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
import Link from "next/link";

function NotesDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <LayoutList />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Chapters</DrawerTitle>
          <DrawerDescription>Select a Chapter</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="max-h-[calc(100vh-106px)] overflow-y-scroll">
          <Link
            href={"/"}
            className="font-medium text-slate-300 border border-y-2 p-4 rounded"
          >
            Introduction to Computer
          </Link>
          <Link
            href={"/"}
            className="font-medium text-slate-300 border border-y-2 p-4 rounded"
          >
            The Computer System Hardware
          </Link>
          <Link
            href={"/"}
            className="font-medium text-slate-300 border border-y-2 p-4 rounded"
          >
            Computer Memory
          </Link>
          <Link
            href={"/"}
            className="font-medium text-slate-300 border border-y-2 p-4 rounded"
          >
            Input and Output Devices
          </Link>
          <Link
            href={"/"}
            className="font-medium text-slate-300 border border-y-2 p-4 rounded"
          >
            Data Representation
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default NotesDrawer;
