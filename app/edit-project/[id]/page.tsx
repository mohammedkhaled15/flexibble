import { getCurrentUser } from '@/utils/authOptions'
import React from 'react'
import { redirect } from 'next/navigation';
import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';

type Props = {
  params: {
    id: string
  }
}

const EditPage = async ({ params }: Props) => {
  const session = await getCurrentUser()

  if (!session) {
    redirect("/")
  }
  return (
    <Modal>
      <h3 className="modal-head-text">Edit a  Project</h3>
      <ProjectForm projectId={params.id} type="edit" session={session} />
    </Modal>
  )
}

export default EditPage