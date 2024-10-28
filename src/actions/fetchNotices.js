"use server";

import { db } from "@/app/firebaseConfig";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

export const fetchRecentNotices = async () => {
  const noticesSnapshot = await getDocs(
    query(collection(db, "notices"), orderBy("timestamp", "desc"), limit(6))
  );
  let notices = [];
  noticesSnapshot.forEach((notice) => {
    const { title, date, link } = notice.data();
    notices.push({ title, date, link });
  });
  return notices;
};
