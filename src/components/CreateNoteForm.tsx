import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

type Inputs = {
  email: string,
  content: string,
};

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      className="mx-5 mt-5 grid grid-cols-4 gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      
      <Label className="col-span-1" htmlFor="email">Email</Label>
      <Input
        className="col-span-3"
        type="email"
        id="email"
        {...register("email", { required: "Email is required" })}
        aria-invalid={errors.email ? "true" : "false"} 
      />
      {errors.email && <p className="text-red-500 col-span-4 text-right" role="alert">{errors.email?.message}</p>}
      
      {/* include validation with required or other standard HTML validation rules */}
      <Label className="col-span-1" htmlFor="content">Content</Label>
      <Input
        className="col-span-3"
        id="content"
        {...register("content", { required: "Content is required" })}
        aria-invalid={errors.content ? "true" : "false"} 
      />
      {errors.content && <p className="text-red-500 col-span-4 text-right" role="alert">{errors.content?.message}</p>}
      
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default Form