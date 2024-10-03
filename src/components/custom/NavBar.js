import Link from "next/link";
import NavMenu from "./NavMenu";

function NavBar() {
  return (
    <nav className="flex justify-center">
      <div className="flex justify-between items-center p-6 w-full max-w-7xl">
        <Link href={"/"} className="font-bold text-2xl">
          CSIT Info
        </Link>
        <div className="flex items-center">
          <NavMenu />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
