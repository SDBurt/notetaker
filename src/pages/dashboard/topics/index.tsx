import React from 'react'
import { NextPage } from 'next'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import TopicList from '@/components/TopicList'
import Head from 'next/head'
import { useSession } from 'next-auth/react'

const TopicsPage: NextPage = () => {

  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Note Taker - Topics</title>
        <meta name="description" content="A note taking app built with T3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
      {
        sessionData?.user ? (
          <TopicList/>
        ) : (<p>Please log in to continue</p>)
      }
      </DashboardLayout>
    </>

  )
}

export default TopicsPage