import Study from "@/components/illustration/Study";
import Container from "@/components/custom/Container";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <header className="flex justify-center">
        <Container className="flex items-center">
          <div className="flex flex-col items-start gap-5 flex-1">
            <h1 className="font-extrabold text-5xl">Welcome to CSIT Info</h1>
            <p className="font-bold text-xl">
              One Platform for all resources related to CSIT
            </p>
            <Link
              href={"/"}
              className="bg-white text-black px-4 py-2 rounded font-semibold"
            >
              Get Started
            </Link>
          </div>
          <div className="flex-1">
            <Study />
          </div>
        </Container>
      </header>
    </div>
  );
}
