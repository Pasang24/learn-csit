"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

import semData from "@/data/semData";

const SideLink = ({ title, href }) => {
  return (
    <SheetClose asChild>
      <Link href={href} className={`hover:text-slate-400 text-base`}>
        {title}
      </Link>
    </SheetClose>
  );
};

function SideBar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={30} />
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col  gap-4 mt-12">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="text-base">Semester</span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-4">
                  {semData.map(({ name, href }, index) => (
                    <li key={index}>
                      <SideLink title={name} href={href} />
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <SideLink title={"Entrance"} href={"/entrance"} />
          <SideLink title={"Notices"} href={"/entrance"} />
          <SideLink title={"Course Details"} href={"/coursedetails"} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SideBar;
