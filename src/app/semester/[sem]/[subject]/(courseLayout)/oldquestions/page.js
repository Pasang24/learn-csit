import {
  and,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { BookOpenText } from "lucide-react";
import { rankToSem } from "@/utilities/rankToSem";
import Container from "@/components/custom/Container";
import Link from "next/link";
import Notes from "@/components/illustration/Notes";

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
  let questionsYear = [];

  const questionsYearQuery = query(
    collection(db, "questions"),
    and(where("subjectId", "==", params.subject), where("qNum", "==", 1)),
    orderBy("year")
  );
  const questionsYearSnapshot = await getDocs(questionsYearQuery);

  questionsYearSnapshot.forEach((doc) => {
    let year = doc.get("year");
    questionsYear.push({ name: `${year}`, value: year });
  });

  return (
    <div className="flex justify-center">
      <Container className={"grid gap-2"}>
        {questionsYear.map((question) => (
          <Link
            href={`${`/semester/${params.sem}/${params.subject}/oldquestions/${question.value}`}`}
            className="flex items-center gap-3 border border-accent p-3 rounded overflow-hidden hover:bg-accent select-none"
            style={{ transition: "0.2s all ease" }}
            key={question.value}
          >
            <BookOpenText size={32} className="min-w-8" />
            <h3 className="font-semibold mb-2 sm:text-lg">{`Question Paper ${question.name}`}</h3>
          </Link>
        ))}
        {questionsYear.length === 0 && (
          <div className="max-w-72 place-self-center">
            <Notes />
            <h4 className="text-center text-xl font-semibold mt-4">
              Past Questions Unavailable :(
            </h4>
          </div>
        )}
      </Container>
    </div>
  );
}

export default page;
