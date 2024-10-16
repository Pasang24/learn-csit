"use server";

import { db } from "../firebaseConfig";
import {
  query,
  collection,
  and,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";

export async function fetchQuestions(subject, isYear, year, unit) {
  const questionQuery = isYear
    ? query(
        collection(db, "questions"),
        and(where("subjectId", "==", subject), where("year", "==", year)),
        orderBy("qNum")
      )
    : query(
        collection(db, "questions"),
        and(where("subjectId", "==", subject), where("unit", "==", unit)),
        orderBy("year")
      );

  const questionsSnapshot = await getDocs(questionQuery);
  let tempQuestions = [];

  questionsSnapshot.forEach((doc) => {
    tempQuestions.push(doc.data());
  });

  return tempQuestions;
}
