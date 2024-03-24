"use client"
import { NavItem } from "@/types/nav"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export const Item = ({
  item
}: {
  item: NavItem
}) => {
  const path = usePathname()
  const { link, icon, name } = item

  const isActive = path === item.link

  return (
    <Link
      href={link}
      className={isActive ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary" : `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
    >
      {icon}
      {name}
    </Link>
  )

}
