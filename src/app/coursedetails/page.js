import BreadCrumbs from "@/components/custom/BreadCrumbs";
import Container from "@/components/custom/Container";
import { ChevronsRightIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function page() {
  const eligibilityDetails = [
    {
      title: "For Grading System",
      description:
        "Should have successfully passed 11 and 12 class in Science stream with minimum full marks 100/100 in Physics and Mathematics respectively and should score final grade 'C' in all subjects.",
    },
    {
      title: "For percentage system",
      description:
        "Should have successfully passed 11 and 12 class in Science stream with minimum full marks 100/100 in Physics and Mathematics respectively and should score minimum of second division.",
    },
    {
      title: "For PCL (I.Sc.) or equivalent",
      description:
        "Should have successfully passed I.Sc. or equivalent examination with minimum full marks 100/100 in Physics and Mathematics respectively and should score minimum of second division.",
    },
    {
      title: "For A level",
      description:
        "Should have successfully passed A Level in science stream (with full marks 100/100 in Physics and Mathematics respectively) and should score minimum D Grade (With or without small letter).",
    },
    {
      title: "For CTEVT",
      description:
        "Should have successfully passes three years diploma in Engineering with full marks 100/100 in Physics and Mathematics respectively and should score minimum of second division.",
    },
    {
      title:
        "For International Education Institute or International University",
      description:
        "Should have to submit equivalence letter from Curriculum Development Centre, Sano Thimi, Bhaktapur.",
    },
  ];
  return (
    <div className="flex justify-center">
      <Container>
        <BreadCrumbs currentPage="Course Details" />
        <Tabs defaultValue="Eligibility" className="flex flex-col gap-6 mt-10">
          <TabsList className="self-center">
            <TabsTrigger value="Eligibility">Eligibility Criteria</TabsTrigger>
            <TabsTrigger value="Course Structure">Course Structure</TabsTrigger>
          </TabsList>
          <TabsContent value="Eligibility">
            <div className="flex flex-col gap-4 w-full">
              {eligibilityDetails.map((detail, index) => (
                <div className="flex flex-col gap-2" key={index}>
                  <h4 className="font-semibold">
                    {index + 1}. {detail.title}:
                  </h4>
                  <p className="flex items-start gap-2">
                    <ChevronsRightIcon className="min-w-5" />
                    <span>{detail.description}</span>
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="Course Structure">
            Course Structure of B.Sc.CSIT
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}

export default page;
