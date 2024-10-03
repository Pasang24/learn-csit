"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const semesterDetails = [
  { name: "First Semester", href: "/firstsem" },
  { name: "Second Semester", href: "/secondtsem" },
  { name: "Third Semester", href: "/thirdsem" },
  { name: "Fourth Semester", href: "/fourthsem" },
  { name: "Fifth Semester", href: "/fifthsem" },
  { name: "Sixth Semester", href: "/sixthsem" },
  { name: "Seventh Semester", href: "/seventhsem" },
  { name: "Eighth Semester", href: "/eighthsem" },
];

const MenuItem = ({ title, href }) => {
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={`${navigationMenuTriggerStyle()} min-w-full`}
      >
        {title}
      </NavigationMenuLink>
    </Link>
  );
};

function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Semester</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-col gap-1 p-1">
              {semesterDetails.map(({ name, href }, index) => (
                <MenuItem title={name} href={href} key={index} />
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <MenuItem title={"Entrance"} href={"/entrance"} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <MenuItem title={"Notices"} href={"/notices"} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <MenuItem title={"Course Details"} href={"/details"} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavMenu;
