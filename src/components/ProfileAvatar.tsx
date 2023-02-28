import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const ProfileAvatar = ({src, fb}: {src: string, fb: string}) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>{fb}</AvatarFallback>
    </Avatar>
  )
}

export default ProfileAvatar