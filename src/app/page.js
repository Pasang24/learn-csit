import Study from "@/components/illustration/Study";
import Container from "@/components/custom/Container";
import Box from "@/components/custom/Box";
import BoxContainer from "@/components/custom/BoxContainer";
import semData from "@/data/semData";
import TypeWriter from "@/components/custom/TypeWriter";
import RecentNotices from "@/components/custom/RecentNotices";
import TourButton from "@/components/custom/TourButton";

export default function Home() {
  return (
    <div className="">
      <header className="flex justify-center">
        <Container className="flex flex-col -space-y-16 sm:space-y-0 sm:flex-row sm:items-center">
          <div className="flex flex-col items-start gap-5 flex-1">
            <h1 className="max-w-80 vs:max-w-full font-extrabold text-3xl sm:text-5xl">
              Welcome to LearnCSIT
            </h1>
            <TypeWriter />
            <TourButton />
          </div>
          <div className="hidden vvs:inline vvs:w-60 vs:w-auto sm:w-1/2 self-end">
            <Study />
          </div>
        </Container>
      </header>
      <section className="flex justify-center mt-6">
        <Container>
          <h2 className="font-bold text-xl vvs:text-2xl text-center mb-8">
            Choose any Semester and get it's resources
          </h2>
          <div id="semesters-container">
            <BoxContainer>
              {semData.map(({ name, href, subjects }, index) => (
                <Box href={href} key={index}>
                  <span className="font-semibold text-xl sm:text-2xl">
                    {index + 1}.
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-base">{name}</span>
                    <span className="font-semibold text-slate-300">
                      Subjects: {subjects}
                    </span>
                  </div>
                </Box>
              ))}
            </BoxContainer>
          </div>
        </Container>
      </section>
      <RecentNotices />
    </div>
  );
}
