import React from "react";
import BreadCrumbs from "@/components/custom/BreadCrumbs";
import Container from "@/components/custom/Container";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { semesters, semToRank } from "@/utilities/validSem";
import { BookText } from "lucide-react";
import Box from "@/components/custom/Box";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export async function generateStaticParams() {
  return semesters.map((semester) => ({
    sem: semester,
  }));
}

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
          <div className="grid gap-2">
            {subsData &&
              subsData?.subs?.map((sub) => (
                <React.Fragment key={sub.code}>
                  {sub.name.includes("Elective") ? undefined : (
                    <Box
                      href={`${params.sem}/${sub.name.split(" ").join("-")}`}
                    >
                      <BookText size={32} className="min-w-8" />
                      <div className="flex flex-col items-start gap-2">
                        <span className="font-semibold">{sub.name}</span>
                        <span className="text-sm text-slate-300">
                          {sub.code}
                        </span>
                      </div>
                    </Box>
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
        {electiveData && (
          <div>
            <div className="grid gap-2">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className={
                      "gap-4 p-3 w-full h-full rounded border border-accent my-2"
                    }
                  >
                    <span>
                      <BookText size={32} className="min-w-8" />
                    </span>
                    <div className="flex items-start flex-col gap-2">
                      <span className="font-semibold">
                        {electiveData.title}
                      </span>
                      <span className="text-sm text-slate-300">Elective</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="grid gap-2">
                    {electiveData &&
                      electiveData?.subs?.map((sub) => (
                        <Box
                          href={`${params.sem}/${sub.name
                            .split(" ")
                            .join("-")}`}
                          key={sub.code}
                        >
                          <BookText size={32} className="min-w-8" />
                          <div className="flex flex-col items-start gap-2">
                            <span className="font-semibold">{sub.name}</span>
                            <span className="text-sm text-slate-300">
                              {sub.code}
                            </span>
                          </div>
                        </Box>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default page;
