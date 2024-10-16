import Link from "next/link";

function Logo({ className }) {
  return (
    <Link href={"/"} className={`font-bold text-2xl ${className}`}>
      LearnCSIT
    </Link>
  );
}

export default Logo;
