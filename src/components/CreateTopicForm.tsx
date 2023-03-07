import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"


type Inputs = {
  title: string,
};

const TopicForm = ( {submitHandler}: {submitHandler: (data: {title: string}) => void}  ) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
  

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    submitHandler(data);
    reset();
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className={buttonVariants({variant: "subtle"})}>New Topic</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Topic</DialogTitle>
            <DialogDescription>
            <form
              className="flex flex-col space-y-2 my-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              
              <Label htmlFor="title">Title</Label>
              <Input
                placeholder="Name or category"
                id="title"
                {...register("title", { required: "Title is required" })}
                aria-invalid={errors.title ? "true" : "false"} 
              />
              {errors.title && <p className="text-red-500 col-span-4 text-right" role="alert">{errors.title?.message}</p>}
            </form>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose><Button type="submit" disabled={errors?.title ? true : false} onClick={handleSubmit(onSubmit)}>Create</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
    
  );
}

export default TopicForm