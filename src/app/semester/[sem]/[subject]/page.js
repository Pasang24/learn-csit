import Container from "@/components/custom/Container";
import { db } from "@/app/firebaseConfig";
import { buttonVariants } from "@/components/ui/button";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import { BookCopy } from "lucide-react";

async function page({ params }) {
  const subSnap = await getDoc(doc(db, "subjects", params.subject));
  if (!subSnap.exists()) return notFound();

  const subData = subSnap.data();

  return (
    <div className="flex justify-center">
      <Container>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl">
            {subData.title} ({subData.code})
          </h2>
          <div>
            <h3 className="font-semibold mb-1">Course Description:</h3>
            <p className="text-sm">{subData.desc}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Course Objective:</h3>
            <p className="text-sm">{subData.obj}</p>
          </div>
          <button
            className={`${buttonVariants({
              variant: "outline",
            })} self-start flex gap-2 items-center`}
          >
            <BookCopy strokeWidth={1} />
            <span>View full syllabus</span>
          </button>
          <hr className="mt-2" />
        </div>
      </Container>
    </div>
  );
}

export default page;
