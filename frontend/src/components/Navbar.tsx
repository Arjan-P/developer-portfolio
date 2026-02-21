import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <div className="w-full">
      <div className="flex justify-center px-6">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="flex w-full justify-end gap-6">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to={"/"}>Home</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to={"/blog"}>Blog</Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
