import ChapterMenu from "@/components/custom/ChapterMenu";
import Container from "@/components/custom/Container";
import NotesList from "@/components/custom/NotesList";
import { db, storage } from "@/app/firebaseConfig";
import {
  getDocs,
  query,
  collection,
  where,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";
import { notFound } from "next/navigation";
import { rankToSem } from "@/utilities/rankToSem";
import { getDownloadURL, listAll, ref } from "firebase/storage";

export async function generateStaticParams() {
  let courseData = [];

  const querySnapshot = await getDocs(collection(db, "semesters"));
  querySnapshot.forEach((doc) => {
    courseData.push(doc.data());
  });

  let paramsData = [];

  for (let course of courseData) {
    let sem = rankToSem(course.rank);
    let subjectData = [];

    for (let sub of course.subs) {
      let subject = sub.name.split(" ").join("-");
      let notesData = [];
      const querySnapshot = await getDocs(
        query(
          collection(db, "contents"),
          where("subjectId", "==", subject),
          orderBy("unit")
        )
      );

      querySnapshot.forEach((doc) => {
        notesData.push(doc.data());
      });

      notesData.forEach((note) => {
        subjectData.push({
          sem,
          subject,
          unit: note.unit.toString(),
        });
      });
    }
    paramsData = [...paramsData, ...subjectData];
  }

  return paramsData;
}

async function page({ params }) {
  let notesData = [];
  const querySnapshot = await getDocs(
    query(
      collection(db, "contents"),
      where("subjectId", "==", params.subject),
      orderBy("unit")
    )
  );

  querySnapshot.forEach((doc) => {
    notesData.push(doc.data());
  });

  let currentUnit = Number(params.unit);

  // this line checks if the current unit route is valid or not
  if (isNaN(currentUnit) || !notesData[currentUnit - 1]) return notFound();

  // fetching subject data for getting the title to form root path
  const subSnap = await getDoc(doc(db, "subjects", params.subject));
  const subData = subSnap.data();

  // root path of notes for specific unit folder
  const rootRef = `${params.sem}/${subData.title}/notes/unit${params.unit}`;
  // fetching list of notes data for the subject
  const notesList = await listAll(ref(storage, `${rootRef}/images`));
  // extracting image refs for the notes image files
  const notesImageRefs = notesList.items.map((item) => item._location.path_);
  // fetching all the images URLs of the notes
  const notesImageUrls = await Promise.all(
    notesImageRefs.map(
      async (imageRef) => await getDownloadURL(ref(storage, imageRef))
    )
  );

  // fetching pdf download URL for syllabus
  let notesDownloadUrl = "";
  try {
    notesDownloadUrl = await getDownloadURL(
      ref(storage, `${rootRef}/pdf/note.pdf`)
    );
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex justify-center">
      <Container className="flex gap-4 min-h-[calc(100vh-109px)] relative">
        <ChapterMenu chapters={notesData} currentChapter={currentUnit} />
        <div className="flex-1 md:ml-60">
          <h3 className="font-semibold vs:text-lg sm:text-xl mb-3">
            {`Unit ${currentUnit}: ${notesData[currentUnit - 1].title}`}
          </h3>
          <NotesList notes={notesImageUrls} notesDownload={notesDownloadUrl} />
        </div>
      </Container>
    </div>
  );
}

export default page;
