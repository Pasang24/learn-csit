import BreadCrumbs from "@/components/custom/BreadCrumbs";
import Container from "@/components/custom/Container";
import { notFound } from "next/navigation";

function page({ params }) {
  const validSem = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
  ];
  if (!validSem.includes(params.sem)) return notFound();

  return (
    <div className="flex justify-center">
      <Container>
        <BreadCrumbs currentPages={["Semester", `${params.sem} Semester`]} />
        <div>
          <h2 className="text-center text-3xl font-bold my-6">
            Under Construction!!!
          </h2>
        </div>
      </Container>
    </div>
  );
}

export default page;
