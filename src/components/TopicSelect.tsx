import { cn } from '@/lib/utils'
import { Topic } from '@prisma/client'
import React from 'react'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface TopicSelectProps {
  topics: Topic[] | undefined
  selectedTopic: Topic | null
  topicClicked: (t: Topic | null) => void
}

const TopicSelect = ({topics, selectedTopic, topicClicked}: TopicSelectProps) => {

  return (
    <div>
      <Select
        onValueChange={(v: string) => topicClicked(topics?.find((element) => element.title === v) ?? null)}
        defaultValue={selectedTopic?.title}
        
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a topic" />
        </SelectTrigger>
        <SelectContent>
          {topics?.map((topic) => {
            return (
              <SelectItem key={topic.id} value={topic.title}>{topic.title}</SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
    
  )
}

export default TopicSelect

