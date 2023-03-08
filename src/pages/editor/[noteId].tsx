import EditorLayout from '@/components/layouts/EditorLayout'
import { NoteEditor } from '@/components/NoteEditor'
import { api } from '@/utils/api';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react'

const EditNotePage = () => {

  const router = useRouter()
  const { data: sessionData } = useSession();
  const { data: note } = api.note.getFirst.useQuery(
    {
      noteId: (router.query.noteId ?? "") as string
    },
    {
      enabled: sessionData?.user !== undefined,
    },
  );

  const updateNote = api.note.update.useMutation();
  
  const updateNoteHandler = useCallback(({title, content}: {title: string, content: string}) => {
    
    if (!note?.id) {
      return;
    }

    void updateNote.mutate(
      {
        noteId: note.id,
        title: title,
        content: content,
        topicId: note?.topicId ?? ""
      }
    );
    router.push("/dashboard");
  },[updateNote])

  return (
    <>
      <Head>
        <title>Note Taker - Edit</title>
        <meta name="description" content="A note taking app built with T3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EditorLayout>
        {note && sessionData ? <NoteEditor
          title={note.title}
          content={note.content}
          onSave={updateNoteHandler}
        /> : null}
      </EditorLayout>
    </>
  )
}

export default EditNotePage