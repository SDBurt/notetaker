import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { Button } from '../ui/button'

const EditorLayout = ({children}: PropsWithChildren) => {
  return (
    <div className='flex flex-row justify-center items-center w-full m-8'>
      <div className='w-full max-w-4xl'>
          <Link href="/dashboard">
            <Button variant="subtle">{`< Back`}</Button>
          </Link>
        
        <div>{children}</div>
      </div>
    </div>
  )
}

export default EditorLayout