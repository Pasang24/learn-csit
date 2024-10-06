import { notFound } from "next/navigation";
import { validSem } from "@/utilities/validSem";

function SemLayout({ params, children }) {
  if (!validSem(params.sem)) return notFound();

  return <>{children}</>;
}

export default SemLayout;
