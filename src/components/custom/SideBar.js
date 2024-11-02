import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useModal from "@/hooks/useModal";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import semData from "@/data/semData";

function SideBar() {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  const SideLink = ({ title, href }) => {
    return (
      <Button
        onClick={() => {
          closeModal();
          router.replace(href);
        }}
        variant="primary"
        className={`justify-start px-0 hover:text-slate-400 text-base`}
      >
        {title}
      </Button>
    );
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => {
        if (isOpen) {
          closeModal();
          router.back();
        } else {
          openModal();
        }
      }}
    >
      <SheetTrigger>
        <Menu size={30} />
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col  gap-4 mt-12">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:text-slate-300">
                <span className="text-base">Semester</span>
              </AccordionTrigger>
              <AccordionContent className="mt-4">
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
          <SideLink title={"Notices"} href={"/notices"} />
          <SideLink title={"Course Details"} href={"/coursedetails"} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SideBar;
