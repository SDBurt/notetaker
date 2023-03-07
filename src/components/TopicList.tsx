import { cn } from '@/lib/utils'
import { Topic } from '@prisma/client'
import React from 'react'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface TopicListProps {
  topics: Topic[] | undefined
  selectedTopic: Topic | null
  topicClicked: (t: Topic | null) => void
}

const TopicList = ({topics, selectedTopic, topicClicked}: TopicListProps) => {

  return (
    <div>
      <Label>Topic</Label>
      <Select
        onValueChange={(v: string) => topicClicked(topics?.find((element) => element.title === v) ?? null)}
        defaultValue={selectedTopic?.title}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={selectedTopic?.title} />
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

export default TopicList

