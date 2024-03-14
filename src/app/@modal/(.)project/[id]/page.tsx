import ProjectModal from '@/components/ProjectModal';
import Modal from '@/components/ui/modal';
import React from 'react'

export default function Page(props: {
  params: {
    id: string
  }
}) {
  const { id } = props.params;
  return (
    <Modal>
      <ProjectModal id={id} />
    </Modal>
  )
}
