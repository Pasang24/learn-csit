"use client";

import Link from "next/link";
import NavMenu from "./NavMenu";
import SideBar from "./SideBar";

import { useMediaQuery } from "react-responsive";

function NavBar() {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <nav className="flex justify-center">
      <div className="flex justify-between items-center p-6 w-full max-w-7xl">
        <Link href={"/"} className="font-bold text-2xl">
          CSIT Info
        </Link>
        <div className="flex items-center">
          {isDesktopOrLaptop ? <NavMenu /> : <SideBar />}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
