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

async function page({ params }) {
  const questionQuery = query(
    collection(db, "questions"),
    and(
      where("subjectId", "==", params.subject),
      where("year", "==", params.year)
    ),
    orderBy("qNum")
  );

  const questionsSnapshot = await getDocs(questionQuery);

  // if questions of selected year doesn't exist then return to Not Found page
  if (questionsSnapshot.empty) return notFound();

  let questions = [];

  questionsSnapshot.forEach((doc) => {
    questions.push(doc.data());
  });

  return (
    <div className="flex justify-center">
      <Container className="flex gap-4 min-h-[calc(100vh-109px)] relative">
        <div className="flex-1 md:ml-60">
          <QuestionContainer questions={questions} year={params.year} />
        </div>
      </Container>
    </div>
  );
}

export default page;
