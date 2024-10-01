import Link from "next/link";

function NavBar() {
  return (
    <nav className="flex">
      <Link href={"/"}>CSIT Info</Link>
      <div>
        <Link href={"/"}>Link</Link>
        <Link href={"/"}>Link</Link>
        <Link href={"/"}>Link</Link>
        <Link href={"/"}>Link</Link>
      </div>
    </nav>
  );
}

export default NavBar;
