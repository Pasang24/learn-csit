import Study from "@/components/illustration/Study";
import Container from "@/components/custom/Container";
import Link from "next/link";

import semData from "@/data/semData";

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
              className="bg-white text-black px-4 py-2 rounded font-semibold "
            >
              Get Started
            </Link>
          </div>
          <div className="flex-1">
            <Study />
          </div>
        </Container>
      </header>
      <section className="flex justify-center mt-6">
        <Container>
          <h2 className="font-bold text-3xl text-center mb-12">
            Choose any Semester and get it's resources
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {semData.map(({ name, href, subjects }, index) => (
              <Link
                href={href}
                className="flex items-center gap-4 border border-accent rounded p-6 hover:bg-accent hover:scale-105"
                style={{ transition: "0.3s all ease" }}
                key={index}
              >
                <span className="font-semibold text-2xl">{index + 1}.</span>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-base">{name}</span>
                  <span className="font-semibold text-slate-300">
                    Subjects: {subjects}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <h2 className="font-bold text-3xl mb-12">Recent Notices__</h2>
          <div>
            <h3 className="font-bold text-2xl text-center">Comming soon!</h3>
          </div>
          <Link
            href={"/notices"}
            className="bg-white text-black px-4 py-2 rounded font-semibold "
          >
            View All Notices
          </Link>
        </Container>
      </section>
    </div>
  );
}
