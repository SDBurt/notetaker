import React from 'react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import NoteList from '@/components/NoteList'

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <NoteList />
    </DashboardLayout>
  )
}

export default DashboardPage