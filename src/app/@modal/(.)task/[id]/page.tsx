import Modal from '@/components/ui/modal'
import { api } from '@/trpc/server'
import React from 'react'
import { TaskForm } from './task-form'
import { notFound } from 'next/navigation'

export default async function Page({
  params
}: {
  params: {
    id: string
  }
}) {
  const id = params.id

  const data = await api.tasks.findOne.query({
    id: id
  })

  if (!data) {
    notFound()
  }

  const users = await api.user.byProjectId.query({
    id: data.projectId
  })
  console.log(users)

  return (
    <Modal>
      <div className='w-[800px] h-[800px] bg-background'>
        {id}

        <TaskForm data={data.data} users={users} id={data.id} />
      </div>
    </Modal>
  )
}
