import EditorLayout from '@/components/layouts/EditorLayout'
import { NoteEditor } from '@/components/NoteEditor'
import { api } from '@/utils/api';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import React from 'react'

const EditNotePage = () => {

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
  
  return (
    <EditorLayout>
      {note ? <NoteEditor
        title={note.title}
        content={note.content}
        onSave={({ title, content}) => {
          void updateNote.mutate(
            {
              noteId: note.id,
              title: title,
              content: content,
              topicId: note?.topicId ?? ""
            }
          )
        }}
      /> : null}
    </EditorLayout>
  )
}

export default EditNotePage