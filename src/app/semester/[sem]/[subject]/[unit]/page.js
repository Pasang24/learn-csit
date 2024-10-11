import Container from "@/components/custom/Container";

function page({ params }) {
  return (
    <div className="flex justify-center">
      <Container>
        <h2 className="text-center text-xl font-semibold">
          Unit {params.unit}
        </h2>
      </Container>
    </div>
  );
}

export default page;
