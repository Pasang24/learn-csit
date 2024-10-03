"use client";

import NavMenu from "./NavMenu";
import SideBar from "./SideBar";
import { useMediaQuery } from "react-responsive";

function MenuBar() {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 768px)" });

  if (isDesktopOrLaptop) return <NavMenu />;
  return <SideBar />;
}

export default MenuBar;
