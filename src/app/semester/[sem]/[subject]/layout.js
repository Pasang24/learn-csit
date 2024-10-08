import Container from "@/components/custom/Container";
import ViewSyllabus from "@/components/custom/ViewSyllabus";
import { db, storage } from "@/app/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { ArrowDownToLine } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import SubjectNavBar from "@/components/custom/SubjectNavBar";

async function layout({ params, children }) {
  // fetching subject data from firebase
  const subSnap = await getDoc(doc(db, "subjects", params.subject));

  // checking if the subject exists in firebase and returning not found if it doesn't exist
  if (!subSnap.exists()) return notFound();

  const subData = subSnap.data();

  const rootRef = `${params.sem}/${subData.title}/syllabus`;
  // fetching list of syllabus data for the subject
  const syllabusList = await listAll(ref(storage, `${rootRef}/images`));

  // extracting image refs for the syllabus image files
  const syllabusImageRefs = syllabusList.items.map(
    (item) => item._location.path_
  );

  // fetching all the images URLs of the syllabus
  const syllabusImageUrls = await Promise.all(
    syllabusImageRefs.map(
      async (imageRef) => await getDownloadURL(ref(storage, imageRef))
    )
  );

  // fetching pdf download URL for syllabus
  const syllabusDownloadUrl = await getDownloadURL(
    ref(storage, `${rootRef}/pdf/syllabus.pdf`)
  );

  return (
    <>
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
            <div className="self-start flex items-center gap-2">
              <ViewSyllabus imageUrls={syllabusImageUrls} />
              <a
                href={syllabusDownloadUrl}
                target="_blank"
                download={true}
                className={`${buttonVariants({
                  variant: "outline",
                })} flex gap-2 items-center`}
              >
                <ArrowDownToLine strokeWidth={1} />
                <span className="hidden vs:inline">Download Syllabus</span>
              </a>
            </div>
            <hr className="my-2" />
            <SubjectNavBar />
          </div>
        </Container>
      </div>
      {children}
    </>
  );
}

export default layout;