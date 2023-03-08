import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data";
import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


type Inputs = {title: string}

export const NoteEditor = ({ title, content, onSave }: {title: string, content: string, onSave: (note: {title: string, content: string})  => void}) => {


  const { register, handleSubmit, formState: { errors } } = useForm<{title: string}>();
  const [code, setCode] = useState<string>(content)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log({...data, content: code})
    onSave({...data, content: code})
  }

  return (
    <div>
      <form
        className="flex flex-col mt-5 grid-cols-4 gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {/* <Label className="" htmlFor="title">Note Title</Label> */}
          <Input
            placeholder="Note Title"
            id="title"
            defaultValue={title}
            {...register("title", { required: "Title is required" })}
            aria-invalid={errors.title ? "true" : "false"} 
          />
          {errors.title && <p className="text-red-500 text-right" role="alert">{errors.title?.message}</p>}
        </div>
        <div>
          <CodeMirror
            value={code}
            width="500px"
            height="30vh"
            minWidth="100%"
            minHeight="50vh"
            extensions={[
              markdown({base: markdownLanguage, codeLanguages: languages})
            ]}
            onChange={(value) => setCode(value)}
            className="border border-gray-300"
          />
        </div>
        <Button type="submit" disabled={errors.title !== undefined || code.trim().length === 0}>Save</Button>
      </form>
    </div>
  )
}