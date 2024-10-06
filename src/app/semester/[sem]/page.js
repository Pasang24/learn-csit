import React from "react";
import BreadCrumbs from "@/components/custom/BreadCrumbs";
import Container from "@/components/custom/Container";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { semToRank } from "@/utilities/validSem";
import BoxContainer from "@/components/custom/BoxContainer";
import Box from "@/components/custom/Box";

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
          <h2 className="text-center text-2xl font-bold my-6">Subjects</h2>
          <BoxContainer>
            {subsData &&
              subsData?.subs?.map((sub) => (
                <React.Fragment key={sub.code}>
                  {sub.name.includes("Elective") ? (
                    <div
                      className={
                        "flex flex-col items-center p-6 w-full h-full border border--accent"
                      }
                    >
                      <span className="text-center">{sub.name}</span>
                      <span className="text-center text-sm text-slate-300">
                        {sub.code}
                      </span>
                    </div>
                  ) : (
                    <Box
                      href={`${params.sem}/${sub.name.split(" ").join("-")}`}
                      className="flex-col"
                    >
                      <span className="text-center">{sub.name}</span>
                      <span className="text-center text-sm text-slate-300">
                        {sub.code}
                      </span>
                    </Box>
                  )}
                </React.Fragment>
              ))}
          </BoxContainer>
        </div>
        {electiveData && (
          <div>
            <h2 className="text-center text-2xl font-bold my-6">
              {electiveData.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {subsData &&
                electiveData?.subs?.map((sub) => (
                  <Box
                    href={`${params.sem}/${sub.name.split(" ").join("-")}`}
                    className="flex-col"
                    key={sub.code}
                  >
                    <span className="text-center">{sub.name}</span>
                    <span className="text-center text-sm text-slate-300">
                      {sub.code}
                    </span>
                  </Box>
                ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default page;
