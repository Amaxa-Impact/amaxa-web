import React from 'react'
import { Sidebar } from './sidebar'
import { Navbar } from './_components/navbar'
import { getUserAuth } from '@/server/auth'
import { redirect } from 'next/navigation'
import { Dashboard } from './_components/Dashboard'


export default async function DashboardLayout({
  children,
  params

}: {
  children: React.ReactNode,
  params: {
    projectId: string
  }
}) {
  const { session } = await getUserAuth()
  return (
    <div className="flex h-screen">
      <Sidebar id={params.projectId} />
      <main className="flex-1 overflow-y-auto">
        <Navbar session={session!} />
        <div className="overflow-y-auto p-8 pt-2 md:p-8">
          {children}
        </div>
      </main>
      <Dashboard/>
    </div>
  )
}
