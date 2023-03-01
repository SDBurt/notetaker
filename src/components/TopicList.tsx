import { cn } from '@/lib/utils'
import { Topic } from '@prisma/client'
import React from 'react'

interface TopicListProps {
  topics: Topic[] | undefined
  selectedTopic: Topic | null
  topicClicked: (t: Topic) => void
}

const TopicList = ({topics, selectedTopic, topicClicked}: TopicListProps) => {

  return (
    <div className='flex flex-col space-y-2 px-2'>
      <h2 className='font-semibold font-xl'>Topics</h2>
      <ul className='flex flex-col space-y-2'>
      {topics?.map((topic) => {
        return (
        <li
          className={cn('border rounded p-2', topic === selectedTopic ? "font-bold" : "font-normal")}
          onClick={() => topicClicked(topic)}
        >
            {topic.title}
        </li>
        )
      })}
      </ul>
    </div>
  )
}

export default TopicList

