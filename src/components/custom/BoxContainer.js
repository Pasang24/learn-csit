function BoxContainer({ children, id = "" }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" id={id}>
      {children}
    </div>
  );
}

export default BoxContainer;
