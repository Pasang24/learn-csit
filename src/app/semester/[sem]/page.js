import BreadCrumbs from "@/components/custom/BreadCrumbs";
import Container from "@/components/custom/Container";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { semToRank } from "@/utilities/validSem";

async function page({ params }) {
  let subsData, electiveData;

  const ranks = semToRank(params.sem);

  let querySnapshot;

  // if semester has only one rank i.e. no elective then this query will execute
  if (ranks.length == 1) {
    querySnapshot = await getDocs(
      query(collection(db, "semesters"), where("rank", "==", ranks[0]))
    );
  }
  // if semester has only two ranks i.e. elective exists  then this query will execute
  else {
    querySnapshot = await getDocs(
      query(
        collection(db, "semesters"),
        or(where("rank", "==", ranks[0]), where("rank", "==", ranks[1]))
      )
    );
  }

  if (querySnapshot) {
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      // if the title includes Semester word then it is subject data
      if (data?.title?.includes("Semester")) {
        subsData = data;
      }
      // if the title includes Elective word then it is elective data
      else if (data?.title?.includes("Elective")) {
        electiveData = data;
      }
    });
  }

  return (
    <div className="flex justify-center">
      <Container>
        <BreadCrumbs currentPages={["Semester", `${params.sem} Semester`]} />
        <div>
          <h2 className="text-center text-3xl font-bold my-6">Subjects</h2>
          <div>
            {subsData &&
              subsData?.subs?.map((sub) => (
                <span key={sub.code}>{sub.name}</span>
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default page;
