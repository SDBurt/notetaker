import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

import Link from "next/link";

const NavItems = [
  {
    "label": "Home",
    "href": "/",
  },
  {
    "label": "Dashboard",
    "href": "/dashboard",
  }
]

export const Navigation = () => {

  return (
    <NavigationMenu >
      <NavigationMenuList className="flex flex-row items-start">
        {NavItems.map(navItem => {
          return (
            <NavigationMenuItem key={navItem.label}>
              <Link href={navItem.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {navItem.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navigation