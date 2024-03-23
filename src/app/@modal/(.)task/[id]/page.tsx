import Modal from '@/components/ui/modal'
import React from 'react'

export default function Page({
  params
}: {
  params: {
    id: string
  }
}) {
  const id = params.id
  return (
    <Modal>
      <div className='w-[800px] h-[800px] bg-background'>
        {id}

      </div>
    </Modal>
  )
}
