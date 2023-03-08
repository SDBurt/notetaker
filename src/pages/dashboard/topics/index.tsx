import React from 'react'
import { NextPage } from 'next'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import TopicList from '@/components/TopicList'

const TopicsPage: NextPage = () => {
  return (
    <DashboardLayout>
      <TopicList/>
    </DashboardLayout>
  )
}

export default TopicsPage