'use client';

import { type NextPage } from "next";
import Head from "next/head";

import { api } from "@/utils/api";
import Header from "@/components/Header";
import CreateTopicForm from "@/components/CreateTopicForm";
// import CreateNoteForm from "@/components/CreateNoteForm";
import TopicList from "@/components/TopicList";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Note, Topic } from "@prisma/client";
import { NoteEditor } from "@/components/NoteEditor";
import NoteCard from "@/components/NoteCard";

const NotesPage: NextPage = () => {

  const { data: sessionData } = useSession();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

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

  const { data: notes, refetch: RefetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    },
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {void RefetchNotes();}
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {void RefetchNotes();}
  })

  return (
    <>
      <Head>
        <title>Note Maker</title>
        <meta name="description" content="Notes App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <Header />
        {
          sessionData?.user ? (
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <TopicList topics={topics} topicClicked={(t: Topic | null) => setSelectedTopic(t)} selectedTopic={selectedTopic}/>
              <CreateTopicForm submitHandler={(data: {title: string}) => createTopic.mutate({title: data.title})}/>
            </div>
            <div className="col-span-2">
              {
                notes?.map((note: Note) => {
                  return (
                    <NoteCard note={note} onDelete={() => {
                      void deleteNote.mutate({ id: note.id })
                    }}/>
                  )
                })
              }
              
              <NoteEditor
                onSave={({ title, content}) => {
                  void createNote.mutate(
                    {
                      title: title,
                      content: content,
                      topicId: selectedTopic?.id ?? ""
                    }
                  )
                }}
              />
            </div>
          </div>
          ) : (
            <div className="p-2"><p>Please log in to continue</p></div>
            
          )
        }
      </main>
    </>
  );
};

export default NotesPage;
