"use client";

import NavMenu from "./NavMenu";
import SideBar from "./SideBar";
import { useMediaQuery } from "usehooks-ts";

function MenuBar() {
  const isDesktopOrLaptop = useMediaQuery("(min-width: 768px)", {
    // this somehow fixed the hydration error in nav bar
    initializeWithValue: false,
  });

  if (isDesktopOrLaptop) return <NavMenu />;
  return <SideBar />;
}

export default MenuBar;
