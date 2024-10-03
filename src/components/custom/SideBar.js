import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const semesterDetails = [
  { name: "First Semester", href: "/firstsem" },
  { name: "Second Semester", href: "/secondtsem" },
  { name: "Third Semester", href: "/thirdsem" },
  { name: "Fourth Semester", href: "/fourthsem" },
  { name: "Fifth Semester", href: "/fifthsem" },
  { name: "Sixth Semester", href: "/sixthsem" },
  { name: "Seventh Semester", href: "/seventhsem" },
  { name: "Eighth Semester", href: "/eighthsem" },
];

const SideLink = ({ title, href }) => {
  return (
    <Link href={href} className={`hover:text-slate-400 text-base`}>
      {title}
    </Link>
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
                  {semesterDetails.map(({ name, href }, index) => (
                    <li>
                      <SideLink title={name} href={href} key={index} />
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <SideLink title={"Entrance"} href={"/entrance"} />
          <SideLink title={"Notices"} href={"/entrance"} />
          <SideLink title={"Course Details"} href={"/entrance"} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SideBar;
