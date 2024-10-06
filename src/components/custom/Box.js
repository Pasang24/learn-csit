import Link from "next/link";

function Box({ children, href, className }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 p-6 border border-accent rounded hover:bg-accent hover:scale-105 ${className}`}
      style={{ transition: "0.3s all ease" }}
    >
      {children}
    </Link>
  );
}

export default Box;
