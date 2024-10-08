import Box from "@/components/custom/Box";
import Container from "@/components/custom/Container";

async function page({ params }) {
  return (
    <div className="flex justify-center">
      <Container>
        <div>
          <Box href={"/"}>Notes</Box>
          <Box href={"/"}>Questions</Box>
        </div>
      </Container>
    </div>
  );
}

export default page;
