import ChapterMenu from "@/components/custom/ChapterMenu";
import Container from "@/components/custom/Container";
import NotesList from "@/components/custom/NotesList";
import { db } from "@/app/firebaseConfig";
import { getDocs, query, collection, where, orderBy } from "firebase/firestore";
import { notFound } from "next/navigation";

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

  return (
    <div className="flex justify-center">
      <Container className="flex gap-4 min-h-[calc(100vh-109px)] relative">
        <ChapterMenu chapters={notesData} currentChapter={currentUnit} />
        <div className="flex-1 md:ml-60">
          <h3 className="font-semibold vs:text-lg sm:text-xl mb-3">
            {`Unit ${currentUnit}: ${notesData[currentUnit - 1].title}`}
          </h3>
          <NotesList />
        </div>
      </Container>
    </div>
  );
}

export default page;
