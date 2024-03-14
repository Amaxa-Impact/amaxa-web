import { checkAuth } from '@/server/auth'
import React from 'react'

export default async function Page() {
  await checkAuth()

  return (
    <div>Page</div>
  )
}
