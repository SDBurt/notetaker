import React from 'react'
import { NextPage } from 'next'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import NoteList from '@/components/NoteList'

const DashboardPage: NextPage = () => {
  return (
    <DashboardLayout>
      <NoteList />
    </DashboardLayout>
  )
}

export default DashboardPage