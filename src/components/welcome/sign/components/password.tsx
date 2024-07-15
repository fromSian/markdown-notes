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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { KeyboardEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    password: z.string().regex(
      //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,255}$/
      /^[a-zA-Z0-9#?!@$ %^&*-]{6,255}/,
      {
        message: "at least eight characters required",
      }
    ),
    confirm: z.string().regex(/^[a-zA-Z0-9#?!@$ %^&*-]{6,255}/, {
      message: "at least eight characters required",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });
const Password = ({ handlePasswordSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [fail, setFail] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        setLoading(false);
        setFail(false);

        handlePasswordSubmit(data.password);
      } catch (error) {
        setFail(true);
      } finally {
        setLoading(false);
      }
    },
    [handlePasswordSubmit]
  );

  const onEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const data = form.getValues();
        const { success: valid } = formSchema.safeParse(data);
        if (valid) {
          onSubmit(data);
          e.target.blur();
        }
      }
    },
    [onSubmit]
  );
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputShowHide placeholder="password" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputShowHide
                    placeholder="confirm password"
                    {...field}
                    onKeyDown={onEnter}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center gap-2">
            <button
              type="submit"
              className="p-2 rounded-full border"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : <ArrowRight />}
            </button>
            {fail && <Fail className="w-5 h-5 text-sm" />}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Password;
