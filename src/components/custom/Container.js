function Container({ children, className }) {
  return <div className={`p-6 w-full max-w-7xl ${className}`}>{children}</div>;
}

export default Container;
