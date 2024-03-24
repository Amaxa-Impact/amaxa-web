import { AvatarProps } from '@radix-ui/react-avatar'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Image from 'next/image'
import { User } from 'next-auth'
import { UserIcon } from 'lucide-react'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className='relative aspect-square h-full w-full'>
          <Image
            fill
            src={user.image}
            alt='profile picture'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
          <UserIcon className='h-4 w-4' />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
