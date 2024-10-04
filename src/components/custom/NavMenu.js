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

import semData from "@/data/semData";

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
              {semData.map(({ name, href }, index) => (
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
          <MenuItem title={"Course Details"} href={"/coursedetails"} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavMenu;
