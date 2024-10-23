import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MathJax } from "better-react-mathjax";
import parse from "html-react-parser";
import Confused from "../illustration/Confused";

export function QuestionItem({ question }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-fit flex items-start gap-1 vs:gap-3 hover:text-slate-300 text-left">
          <div className="font-semibold">{question.qNum}.</div>
          <MathJax hideUntilTypeset={"first"} inline dynamic>
            <div>{parse(question.title)}</div>
          </MathJax>
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-w-3xl h-fit max-h-[calc(100vh-100px)] overflow-y-auto"
        id="customScrollBar"
      >
        <DialogHeader>
          <DialogTitle className="flex items-start gap-3 my-4 leading-7">
            <div>{question.qNum}.</div>
            <MathJax hideUntilTypeset={"first"} inline dynamic>
              <div>{parse(question.title)}</div>
            </MathJax>
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
        {/* <DialogFooter>
            <button type="submit">Save changes</button>
          </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
