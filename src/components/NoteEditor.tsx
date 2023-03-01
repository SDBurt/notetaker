import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { languages } from "@codemirror/language-data";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {title: string}

export const NoteEditor = ({onSave}: {onSave: (note: {title: string, content: string})  => void}) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<{title: string}>();
  const [code, setCode] = useState<string>("")

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log({...data, content: code})
    onSave({...data, content: code})
    reset(); // reset form data
    setCode("") // reset codemirror editor content
  }

  return (
    <div className="">
      <form
        className="flex flex-col mx-5 mt-5 grid-cols-4 gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Label className="" htmlFor="title">Topic Title</Label>
          <Input
            className=""
            id="title"
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
            minHeight="30vh"
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