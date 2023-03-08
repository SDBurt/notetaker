import Head from 'next/head'
import ViewerLayout from '@/components/layouts/ViewerLayout'
import NoteViewer from '@/components/NoteViewer'
import { useSession } from 'next-auth/react'

const ViewNotePage = () => {
  
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Note Taker - Note</title>
        <meta name="description" content="A note taking app built with T3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewerLayout>
        {
          sessionData?.user ? (
            <NoteViewer />
          ) : (<p>Please log in to continue</p>)
        }
      </ViewerLayout>
    </>
    
  )
}

export default ViewNotePage