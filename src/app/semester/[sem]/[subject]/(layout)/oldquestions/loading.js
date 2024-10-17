import Container from "@/components/custom/Container";
import SpinnerLoader from "@/components/loaders/SpinnerLoader";

function loading() {
  return (
    <div className="flex justify-center">
      <Container className={"flex justify-center"}>
        <SpinnerLoader />
      </Container>
    </div>
  );
}

export default loading;
