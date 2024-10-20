import { db } from "@/app/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { notFound } from "next/navigation";

async function layout({ params, children }) {
  // fetching subject data from firebase
  const subSnap = await getDoc(doc(db, "subjects", params.subject));

  // checking if the subject exists in firebase and returning not found if it doesn't exist
  if (!subSnap.exists()) return notFound();
  // checking if subject belongs to the particular semester or not and return not found if not
  if (subSnap.get("semester") !== params.sem) return notFound();

  // if everything is correct return page as children
  return children;
}

export default layout;
