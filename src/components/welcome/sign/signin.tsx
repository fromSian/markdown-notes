import Fail from "@/components/icons/fail";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import InputShowHide from "@/components/ui/input-show-hide";
import InputWithLabel from "@/components/ui/input-with-label";
import { cn } from "@/lib/utils";
import { fetchLogin } from "@/request/account";
import { useAppDispatch } from "@/states/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  //   email: z.union([z.literal(""), z.string().email()]),
  email: z.string().email(),
  password: z.string().regex(
    //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,255}$/
    /^[a-zA-Z0-9#?!@$ %^&*-]{6,255}/,
    {
      message: "at least eight characters required",
    }
  ),
});

const SignIn = ({ open }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fail, setFail] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setFail(false);
      setLoading(true);
      const response = await fetchLogin(data);
      dispatch({
        type: "account/setUser",
        payload: response,
      });
      toast.success("login success");
      navigate("/notes");
    } catch (error) {
      setFail(true);
    } finally {
      setLoading(false);
    }
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const data = form.getValues();
      const { success: valid } = formSchema.safeParse(data);
      if (valid) {
        onSubmit(data);
        e.target.blur();
      }
    }
  };

  return (
    <div
      className={cn(
        "grid transition-all duration-500",
        open
          ? "grid-rows-[1fr] opacity-100 mb-4"
          : "grid-rows-[0fr] opacity-0 mb-0"
      )}
    >
      <div className="overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithLabel placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <InputShowHide
                        onKeyDown={onEnter}
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex justify-center gap-4 items-center">
              <button type="submit" className="p-2 rounded-full border">
                {loading ? <Loader className="animate-spin" /> : <ArrowRight />}
              </button>
              {fail && <Fail />}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
