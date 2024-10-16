import QuestionContainer from "@/components/custom/QuestionContainer";
import {
  and,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { fetchQuestions } from "@/app/actions/fetchQuestions";

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
    questionsUnit = [{ name: "Not Available", value: 404 }];
    questionsYear = [{ name: "Not Available", value: 404 }];
  }
  return (
    <QuestionContainer
      unitData={questionsUnit}
      yearData={questionsYear}
      fetchQuestions={fetchQuestions}
    />
  );
}

export default page;
