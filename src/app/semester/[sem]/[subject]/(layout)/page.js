import Container from "@/components/custom/Container";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { rankToSem } from "@/utilities/rankToSem";
import Link from "next/link";

export async function generateStaticParams() {
  let courseData = [];

  const querySnapshot = await getDocs(collection(db, "semesters"));
  querySnapshot.forEach((doc) => {
    courseData.push(doc.data());
  });

  let paramsData = [];

  courseData.forEach((course) => {
    let sem = rankToSem(course.rank);
    const subjectData = course.subs.map((sub) => ({
      sem,
      subject: sub.name.split(" ").join("-"),
    }));
    paramsData = [...paramsData, ...subjectData];
  });

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
  return (
    <div className="flex justify-center">
      <Container className={"grid gap-2"}>
        {notesData.map((note) => (
          <Link
            href={`${`/semester/${params.sem}/${params.subject}/${note.unit}`}`}
            className="flex items-center gap-3 border border-accent p-3 rounded overflow-hidden hover:bg-accent select-none"
            style={{ transition: "0.2s all ease" }}
            key={note.unit}
          >
            <span className="font-semibold text-xl sm:text-2xl">
              {note.unit}.
            </span>
            <div className="overflow-hidden">
              <h3 className="font-semibold mb-2 sm:text-lg">{`${note.title}`}</h3>
              <p className="text-sm text-slate-300 whitespace-nowrap overflow-hidden overflow-ellipsis">
                {note.content}
              </p>
            </div>
          </Link>
        ))}
      </Container>
    </div>
  );
}

export default page;
