import BreadCrumbs from "@/components/custom/BreadCrumbs";
import Container from "@/components/custom/Container";
import eligibilityData from "@/data/eligibilityData";
import courseData from "@/data/courseData";
import { ChevronsRightIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from "@/components/custom/DataTable";

function page() {
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
              {eligibilityData.map((detail, index) => (
                <div className="flex flex-col gap-2" key={index}>
                  <h4 className="font-semibold text-base">
                    {index + 1}. {detail.title}:
                  </h4>
                  <p className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                    <ChevronsRightIcon className="min-w-5" />
                    <span>{detail.description}</span>
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="Course Structure">
            <div className="flex flex-col gap-4">
              {courseData.map((course, index) => (
                <div key={index}>
                  <DataTable
                    headData={["Subject", "Course Code"]}
                    cellData={course.subs}
                    caption={course.title}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}

export default page;
