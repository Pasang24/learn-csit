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
  const questionsYearQuery = query(
    collection(db, "questions"),
    and(where("subjectId", "==", params.subject), where("qNum", "==", 1)),
    orderBy("year")
  );
  const subjectRef = doc(db, "subjects", params.subject);

  // fetching questions from server which will parse math equations into svg
  const questionsResponse = await fetch(`${process.env.SERVER_URL}/convert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: params.subject,
      year: params.year,
    }),
  });

  const questionsJson = await questionsResponse.json();

  const [questionsYearSnapshot, subjectSnapShot] = await Promise.all([
    await getDocs(questionsYearQuery),
    await getDoc(subjectRef),
  ]);

  // if questions of selected year doesn't exist then return to Not Found page
  if (!questionsJson?.questions?.length) return notFound();

  let questions = questionsJson?.questions || [];
  let subject = subjectSnapShot.data();
  let questionsYear = [];

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
