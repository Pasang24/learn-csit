import { db } from "@/app/firebaseConfig";
import {
  query,
  collection,
  and,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import QuestionContainer from "@/components/custom/QuestionContainer";
import Container from "@/components/custom/Container";
import QuestionMenu from "@/components/custom/QuestionMenu";
import { notFound } from "next/navigation";
import { rankToSem } from "@/utilities/rankToSem";

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
      let questionYearsData = [];
      const questionYearSnapshot = await getDocs(
        query(
          collection(db, "questions"),
          and(where("subjectId", "==", subject), where("qNum", "==", 1)),
          orderBy("year")
        )
      );

      questionYearSnapshot.forEach((doc) => {
        questionYearsData.push(doc.get("year"));
      });

      questionYearsData.forEach((year) => {
        subjectData.push({
          sem,
          subject,
          year,
        });
      });
    }
    paramsData = [...paramsData, ...subjectData];
  }

  return paramsData;
}

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
  const subjectRef = doc(db, "subjects", params.subject);

  const [questionsSnapshot, questionsYearSnapshot, subjectSnapShot] =
    await Promise.all([
      await getDocs(questionsQuery),
      await getDocs(questionsYearQuery),
      await getDoc(subjectRef),
    ]);

  // if questions of selected year doesn't exist then return to Not Found page
  if (questionsSnapshot.empty) return notFound();

  let subject = subjectSnapShot.data();
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
      <Container className="flex gap-4 relative">
        <QuestionMenu years={questionsYear} currentYear={params.year} />
        <div className="flex-1 md:ml-48">
          <QuestionContainer
            subject={subject}
            questions={questions}
            year={params.year}
          />
        </div>
      </Container>
    </div>
  );
}

export default page;
