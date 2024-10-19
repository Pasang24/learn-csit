import { db } from "@/app/firebaseConfig";
import {
  query,
  collection,
  and,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import QuestionContainer from "@/components/custom/QuestionContainer";
import Container from "@/components/custom/Container";
import { notFound } from "next/navigation";
import QuestionMenu from "@/components/custom/QuestionMenu";

async function page({ params }) {
  const questionsQuery = query(
    collection(db, "questions"),
    and(
      where("subjectId", "==", params.subject),
      where("year", "==", params.year)
    ),
    orderBy("qNum")
  );
  const questionsYearQuery = query(
    collection(db, "questions"),
    and(where("subjectId", "==", params.subject), where("qNum", "==", 1)),
    orderBy("year")
  );

  const questionsSnapshot = await getDocs(questionsQuery);
  const questionsYearSnapshot = await getDocs(questionsYearQuery);

  // if questions of selected year doesn't exist then return to Not Found page
  if (questionsSnapshot.empty) return notFound();

  let questions = [];
  let questionsYear = [];

  questionsSnapshot.forEach((doc) => {
    questions.push(doc.data());
  });

  questionsYearSnapshot.forEach((doc) => {
    let year = doc.get("year");
    questionsYear.push({ name: `Question Bank ${year}`, value: year });
  });

  return (
    <div className="flex justify-center">
      <Container className="flex gap-4 min-h-[calc(100vh-109px)] relative">
        <QuestionMenu years={questionsYear} currentYear={params.year} />
        <div className="md:ml-60">
          <QuestionContainer questions={questions} year={params.year} />
        </div>
      </Container>
    </div>
  );
}

export default page;
