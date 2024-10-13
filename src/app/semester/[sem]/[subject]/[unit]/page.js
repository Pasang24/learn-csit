import ChapterList from "@/components/custom/ChapterList";
import Container from "@/components/custom/Container";
import NotesList from "@/components/custom/NotesList";

function page({ params }) {
  return (
    <div className="flex justify-center">
      <Container className="flex gap-4 min-h-[calc(100vh-109px)] relative">
        <ChapterList />
        <div className="flex-1 sm:ml-60">
          <h3 className="font-semibold mb-3">Introduction to Computer</h3>
          <NotesList />
        </div>
      </Container>
    </div>
  );
}

export default page;
