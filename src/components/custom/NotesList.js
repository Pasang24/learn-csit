"use client";

function NotesList({ notes }) {
  return (
    <div className="grid grid-cols-3 vs:grid-cols-4 lg:grid-cols-5 gap-2">
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <div
            className="bg-accent aspect-[1/1.14] flex justify-center items-center"
            key={index}
          >
            <span>Image</span>
          </div>
        ))}
    </div>
  );
}

export default NotesList;
