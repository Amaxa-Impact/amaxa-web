import Edit from '@/components/permissions/edit';
import { ManageUserPermissions } from '@/components/permissions/form';
import { checkAuth, getUserAuth } from '@/server/auth';
import React from 'react'

export default async function Page(
  props: {
    params: {
      id: string
    }
  }
) {
  await checkAuth()
  const { session } = await getUserAuth()

  const { id } = props.params;

  return (
    <div>
      <Edit
        userId={id}
        currentPermissions={session!.user.permissions}

      />
    </div>
  )
}
