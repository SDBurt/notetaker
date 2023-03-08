import React from 'react'
import { NextPage } from 'next'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import NoteList from '@/components/NoteList'
import Head from 'next/head'
import { useSession } from 'next-auth/react'

const DashboardPage: NextPage = () => {

  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Note Taker - Notes</title>
        <meta name="description" content="A note taking app built with T3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
      {
        sessionData?.user ? (
          <NoteList />
        ) : (<p>Please log in to continue</p>)
      }
      </DashboardLayout>

    </>
  )
}

export default DashboardPage