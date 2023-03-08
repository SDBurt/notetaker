import ViewerLayout from '@/components/layouts/ViewerLayout'
import NoteViewer from '@/components/NoteViewer'
import Head from 'next/head'
import React from 'react'

const ViewNotePage = () => {
  return (
    <>
      <Head>
        <title>Note Taker - Note</title>
        <meta name="description" content="A note taking app built with T3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewerLayout>
        <NoteViewer />
      </ViewerLayout>
    </>
    
  )
}

export default ViewNotePage