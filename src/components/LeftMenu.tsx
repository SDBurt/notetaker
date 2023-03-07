import { api } from '@/utils/api'
import { Note, Topic } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Button } from './ui/button'

const menuItems = [
  {
    label: "Topic",
    name: "topic",
    action: () => console.log("Topic")
  },
  {
    label: "Note",
    name: "note",
    action: () => console.log("Note")
  },
]

const LeftMenu = () => {
  return (
    <div className='flex flex-col p-1'>
      <LeftMenuHeader />
      <LeftMenuBody />
    </div>
  )
}

export default LeftMenu

const LeftMenuHeader: React.FC = () => {
  return (
    <div className='flex flex-row space-x-1 p-1'>
      {
        menuItems.map((menuItem) => {
          return (
            <Button
              key={menuItem.name}
              variant="ghost"
            >
              {menuItem.label}
            </Button>
          )
      })
    }
    </div>
  )
}

const LeftMenuBody: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: topics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    },
  );

  return (
    <div className='flex flex-col space-y-2 px-2'>
      <TopicsAccordion topics={topics}/>
    </div>
  )

}

const TopicsAccordion: React.FC<{topics: Topic[] | undefined}> = ({topics}) => {
  
  return (
    <div>
      <Accordion type="single" collapsible>
        {
          topics?.map((topic: Topic) => {
            return (
              <TopicAccordionItems key={topic.id} topic={topic}/>
            )
          })
        }
      </Accordion>
    </div>
  )
}

const TopicAccordionItems: React.FC<{topic: Topic}> = ({topic}) => {
  
  const { data: sessionData } = useSession();
  const router = useRouter()



  const { data: notes } = api.note.getAll.useQuery(
    {
      topicId: topic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && topic !== null,
    },
  );

  return (
    <AccordionItem value={topic.id}>
      <AccordionTrigger><h2 className='font-semibold'>{topic.title}</h2></AccordionTrigger>
      <AccordionContent className='p-1'>
        <ul>
          {
            notes?.map((note: Note) => {
              return (
                <Button
                  key={note.id}
                  variant="ghost"
                  onClick={() => {
                    router.query.noteId=note.id;
                    router.push(router);
                  }}
                >{note.title}</Button>
              )
            })
          }
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}