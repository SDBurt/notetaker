import { api } from '@/utils/api';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react'
import ReactMarkdown from 'react-markdown'

const NoteViewer = () => {

  const { data: sessionData } = useSession();
  const router = useRouter()

  const { data: note } = api.note.getFirst.useQuery(
    {
      noteId: (router.query.noteId ?? "") as string,
    },
    {
      enabled: sessionData?.user !== undefined && router.query.noteId !== null,
    },
  );

  return (
    <div className='p-8'>
        {
        note ? (
          <>
            <article className="prose lg:prose-lg">
              <h2>{note.title}</h2>
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </>
        ) : (
          <div>No Note with that ID</div>
        )
        }
      
    </div>
   
  )
}

export default NoteViewer