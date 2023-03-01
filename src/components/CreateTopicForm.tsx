import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

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
    <div className='flex flex-col space-y-2 px-2 mt-5'>
      <h2 className='font-semibold font-xl'>Create a New Topic</h2>
      <form
        className="grid grid-cols-5 gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        
        <Label className="col-span-1" htmlFor="title">Topic Title</Label>
        <Input
          className="col-span-4"
          id="title"
          {...register("title", { required: "Title is required" })}
          aria-invalid={errors.title ? "true" : "false"} 
        />
        {errors.title && <p className="text-red-500 col-span-4 text-right" role="alert">{errors.title?.message}</p>}
        
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default TopicForm