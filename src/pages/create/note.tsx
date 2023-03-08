import React, { useCallback, useState } from 'react'
import { NextPage } from 'next';

import EditorLayout from '@/components/layouts/EditorLayout'
import { NoteEditor } from '@/components/NoteEditor'
import { api } from "@/utils/api";
import { useSession } from 'next-auth/react';
import { Topic } from '@prisma/client';
import TopicSelect from '@/components/TopicSelect';
import CreateTopicForm from '@/components/CreateTopicForm';

const CreateNotePage: NextPage = () => {

  const { data: sessionData } = useSession();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: RefetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data: Topic[]) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null)
      }
    },
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {void RefetchTopics();}
  });

  const createNote = api.note.create.useMutation();

  const createTopicHandler = useCallback((data: {title: string}) => {
    void createTopic.mutate({title: data.title})
  }, [createTopic])

  const createNoteHandler = useCallback(({ title, content }: {title: string, content: string}) => {
    void createNote.mutate(
      {
        title: title,
        content: content,
        topicId: selectedTopic?.id ?? ""
      }
    )
  }, [createNote])

  return (
    <EditorLayout>
      {
        sessionData?.user ? (
          <div className='flex flex-col space-y-4 mt-8'>
            <div>
              <h1 className='font-bold text-2xl'>Create</h1>
              <span className='font-normal text-gray-500'>Publish a new note</span>
            </div>
            <div className='flex flex-row justify-between'>
              <TopicSelect topics={topics} topicClicked={(t: Topic | null) => setSelectedTopic(t)} selectedTopic={selectedTopic}/>
              <CreateTopicForm submitHandler={createTopicHandler}/>
            </div>

            <NoteEditor
              title=""
              content=""
              onSave={createNoteHandler}/>
          </div>
          ) : null
      }
    </EditorLayout>
  )
}

export default CreateNotePage