import React from 'react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

import Link from "next/link";
import { cn } from '@/lib/utils';

import { usePathname } from "next/navigation"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    disabled: false
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    disabled: true
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    disabled: true
  },

]

const LeftNav = () => {

  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        // const Icon = Icons[item.icon || "arrowRight"]
        return (
          <Link key={index} href={item.disabled ? "/" : item.href}>
            <span className={
              cn("group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100", 
                  path === item.href ? "bg-slate-200" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80")}>
              <span>{item.title}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

export default LeftNav