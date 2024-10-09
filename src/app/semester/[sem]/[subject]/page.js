import Container from "@/components/custom/Container";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { rankToSem } from "@/utilities/rankToSem";

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
  const querySnapshot = await getDocs(
    query(
      collection(db, "contents"),
      where("subjectId", "==", params.subject),
      orderBy("unit")
    )
  );

  querySnapshot.forEach((doc) => console.log(doc.data()));
  return (
    <div className="flex justify-center">
      <Container>
        <h3 className="font-semibold text-xl text-center">
          Notes Page. Under Construction!!
        </h3>
      </Container>
    </div>
  );
}

export default page;
