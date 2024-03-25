import { NavItem } from '@/types/nav'
import {  Home, LayoutList, UserCog } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Item } from './_components/Item'

export const Sidebar = ({
  id
}: {
  id: string
}) => {
  const links: NavItem[] = [
    {
      link: `/dashboard/${id}/home`,
      name: `Home`,
      icon: <Home className="h-4 w-4" />
    },
    {
      link: `/dashboard/${id}/tasks`,
      name: `Tasks Flow Chart`,
      icon: <LayoutList className='h-4 w-4' />
    },
    {
      link: `/dashboard/${id}/users`,
      name: `Users`,
      icon: <UserCog />
    }
  ]

  return (
    <div className="hidden border-r bg-muted/40 md:block min-w-[250px]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="">Amaxa Impact</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {
              links.map((item) => <Item item={item} key={item.name} />)
            }
          </nav>
        </div>

      </div>
    </div>
  )
}

