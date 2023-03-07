import React, { PropsWithChildren } from 'react'
import Header from '../Header'
import LeftNav from '../LeftNav'

function DashboardLayout({children}: PropsWithChildren) {
  return (
    <div className='mx-4'>
      <Header />
      <div className='grid grid-cols-7 gap-6 '>
        
        {/* Left Nav */}
        <div className='col-span-2'>
          <LeftNav />
        </div>

        {/* Content */}
        <div className='col-span-5'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout