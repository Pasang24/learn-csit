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
import Container from "@/components/custom/Container";
import Link from "next/link";

async function page({ params }) {
  let questionsUnit = [];
  let questionsYear = [];

  const questionsUnitQuery = query(
    collection(db, "contents"),
    where("subjectId", "==", params.subject),
    orderBy("unit")
  );
  const questionsYearQuery = query(
    collection(db, "questions"),
    and(where("subjectId", "==", params.subject), where("qNum", "==", 1)),
    orderBy("year")
  );
  const [questionUnitSnapshot, questionsYearSnapshot] = await Promise.all([
    await getDocs(questionsUnitQuery),
    await getDocs(questionsYearQuery),
  ]);

  questionUnitSnapshot.forEach((doc) => {
    let unit = doc.get("unit");
    questionsUnit.push({ name: `Unit ${unit}`, value: unit });
  });
  questionsYearSnapshot.forEach((doc) => {
    let year = doc.get("year");
    questionsYear.push({ name: `${year}`, value: year });
  });

  // this line checks if we don't have past questions and modifies the arrays accordingly
  if (questionsUnit.length === 0 || questionsYear.length === 0) {
    questionsUnit = [{ name: "Not Available", value: "404" }];
    questionsYear = [{ name: "Not Available", value: "404" }];
  }
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
      </Container>
    </div>
  );
}

export default page;
