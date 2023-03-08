import { api } from '@/utils/api';
import { Topic } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React from 'react'
import CreateTopicForm from './CreateTopicForm';
import { Button } from './ui/button';

const TopicList = () => {

  const { data: sessionData } = useSession();

  const { data: topics, refetch: RefetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    },
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {void RefetchTopics();}
  });

  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: () => {void RefetchTopics();}
  })

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-row justify-between'>
        <div>
          <h1 className='font-bold text-2xl'>Topics</h1>
          <span className='font-normal text-gray-500'>Create and manage topics</span>
        </div>
        <div>
          <CreateTopicForm submitHandler={(data: {title: string}) => createTopic.mutate({title: data.title})}/>
        </div>
      </div>
      <div className='flex flex-col space-y-2'>
        {
          topics && topics.length > 0 ? topics?.map((topic: Topic) => {
            return (
              <div key={topic.title} className='flex flex-row justify-between items-center p-4 border border-gray-200 rounded'>
                <div className='flex flex-col'>
                  <h2 className='font-bold'>{topic.title}</h2>
                </div>
                <div className='flex flex-row space-x-2'>
                  <Button variant="subtle" size="sm" onClick={() => {
                      void deleteTopic.mutate({ id: topic.id })
                  }}>Delete</Button>
                </div>
              </div>
            )
          }) : null
        }
        {
          topics && topics.length === 0 ? (<p>No Topics. Create a new topic now.</p>) : null
        }
      </div>
    </div>
  )
}

export default TopicList