import React, { useState } from 'react'
import Link from 'next/link'
import { Note, Topic } from '@prisma/client';
import { useSession } from 'next-auth/react';

import { Button } from './ui/button'

import { api } from "@/utils/api";
import TopicSelect from '@/components/TopicSelect';
import CreateTopicForm from './CreateTopicForm';

function NoteList() {

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: sessionData } = useSession();

  const { data: topics, refetch: RefetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null)
      }
    },
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {void RefetchTopics();}
  });

  const { data: notes, refetch: RefetchNotes  } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined,
    },
  );

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {void RefetchNotes();}
  })

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-row justify-between'>
        <div>
          <h1 className='font-bold text-2xl'>Notes</h1>
          <span className='font-normal text-gray-500'>Create and manage notes</span>
        </div>
        <div>
          <Link href="/create/note"><Button>New Note</Button></Link>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center'>
        <TopicSelect topics={topics} topicClicked={(t: Topic | null) => setSelectedTopic(t)} selectedTopic={selectedTopic}/>
        <CreateTopicForm submitHandler={(data: {title: string}) => createTopic.mutate({title: data.title})}/>
      </div>
      <div className='flex flex-col space-y-2'>
        {
          notes && notes.length > 0 ? notes?.map((note: Note) => {
            return (
              <div key={note.title} className='flex flex-row justify-between items-center p-4 border border-gray-200 rounded'>
                <div className='flex flex-col'>
                  <Link href={`/notes/${note.id}`} className="hover:underline">
                    <h2 className='font-bold'>{note.title}</h2>
                  </Link>
                  {/* <span className='font-normal text-gray-500'>Date Placeholder</span> */}
                </div>
                <div className='flex flex-row space-x-2'>
                  <Link href={`/editor/${note.id}`}><Button variant="subtle" size="sm">Edit</Button></Link>
                  <Button variant="subtle" size="sm" onClick={() => {
                      void deleteNote.mutate({ id: note.id })
                  }}>Delete</Button>
                </div>
              </div>
            )
          }) : null
        }
        {
          notes && notes.length === 0 ? (<p>No notes. Create a new note now.</p>) : null
        }
      </div>
    </div>
  )
}

export default NoteList