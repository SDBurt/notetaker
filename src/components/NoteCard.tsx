import { Note } from '@prisma/client'
import React, { useState } from 'react'

import ReactMarkdown from 'react-markdown'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from './ui/button'

const NoteCard = ({
  note, onDelete
}: {
  note: Note,
  onDelete: () => void
}) => {

  return (
  <div className='border rounded-sm border-gray-200 p-2'>
    <Accordion type="single" collapsible>
      <AccordionItem value={note.title}>
        <AccordionTrigger><h2 className='font-bold text-xl'>{note.title}</h2></AccordionTrigger>
        <AccordionContent>
          <article className="prose lg:prose-lg">
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </article>
          <div className='flex flex-row items-end justify-end'>
            <Button variant="default" size="sm" onClick={onDelete}>Delete</Button>
          </div>
          
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  )
}

export default NoteCard