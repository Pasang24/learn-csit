"use server";

import { db } from "@/app/firebaseConfig";
import {
  getDocs,
  query,
  collection,
  orderBy,
  limit,
  where,
} from "firebase/firestore";

export const fetchNextPage = async (perPage, lastSequencecNum) => {
  const noticesQuery = query(
    collection(db, "notices"),
    where("sequenceNumber", "<", lastSequencecNum),
    orderBy("timestamp", "desc"),
    limit(perPage)
  );
  const noticesSnapshot = await getDocs(noticesQuery);

  let notices = [];
  noticesSnapshot.forEach((notice) => {
    const { title, date, link } = notice.data();
    notices.push({ title, date, link });
  });

  let newLastSequenceNum =
    noticesSnapshot.docs[noticesSnapshot.docs.length - 1].get("sequenceNumber");

  return { notices, newLastSequenceNum };
};
