import NotesDrawer from "./NotesDrawer";

function NotesButton() {
  return (
    <button className="fixed bottom-6 right-6 bg-[#1d1d22] rounded-full p-4 border shadow-md shadow-black md:hidden">
      <NotesDrawer />
    </button>
  );
}

export default NotesButton;
