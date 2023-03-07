import { api } from '@/utils/api';
import { useSession } from 'next-auth/react'
import React from 'react'

const Content = () => {

  const { data: sessionData } = useSession();

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    }
  );



  return (
    <div>Content</div>
  )
}

export default Content