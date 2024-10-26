import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";
import { memo } from "react";
import parser from "html-react-parser";
import useModal from "@/hooks/useModal";
import Confused from "../illustration/Confused";

// Creating a memoized component for the parsed title
const ParsedTitle = memo(({ qNum, title }) => (
  <>
    <div>{qNum}.</div>
    <div>{parser(title)}</div>
  </>
));

export function QuestionItem({ question }) {
  const { isOpen, openModal, closeModal } = useModal();
  const isDesktopOrLaptop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });

  if (isDesktopOrLaptop) {
    return (
      <Dialog
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
        <DialogTrigger asChild>
          <button className="w-fit flex items-start gap-1 vs:gap-3 hover:text-slate-300 text-left">
            <ParsedTitle qNum={question.qNum} title={question.title} />
          </button>
        </DialogTrigger>
        <DialogContent
          className="w-11/12 max-w-3xl h-fit max-h-[calc(100vh-100px)] overflow-y-auto"
          id="customScrollBar"
        >
          <DialogHeader>
            <DialogTitle className="flex items-start gap-3 my-4 leading-7">
              <ParsedTitle qNum={question.qNum} title={question.title} />
            </DialogTitle>
            <DialogDescription className="text-base">Answer:</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mb-3">
            <div className="w-96">
              <Confused />
              <h3 className="text-center text-2xl font-semibold">
                Answer Unavailable :(
              </h3>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      shouldScaleBackground
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
        <button className="w-fit flex items-start gap-1 vs:gap-3 hover:text-slate-300 text-left">
          <ParsedTitle qNum={question.qNum} title={question.title} />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-start gap-3 my-4 leading-7">
            <ParsedTitle qNum={question.qNum} title={question.title} />
          </DrawerTitle>
          <DrawerDescription className="text-base">Answer:</DrawerDescription>
        </DrawerHeader>
        <div className="flex justify-center mb-4">
          <div className="max-w-96">
            <Confused />
            <h3 className="text-center text-xl font-semibold">
              Answer Unavailable :(
            </h3>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
