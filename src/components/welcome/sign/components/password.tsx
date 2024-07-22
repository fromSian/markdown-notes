import Fail from "@/components/icons/fail";
import SuccessIcon from "@/components/icons/success";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import InputShowHide from "@/components/ui/input-show-hide";
import { z } from "@/i18";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { KeyboardEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const formSchema = z
  .object({
    password: z
      .string()
      .refine((value) => /^[a-zA-Z0-9#?!@$%^&*-]{6,255}/.test(value), {
        params: { i18n: "password" },
      }),
    confirm: z
      .string()
      .refine((value) => /^[a-zA-Z0-9#?!@$%^&*-]{6,255}/.test(value), {
        params: { i18n: "password" },
      }),
  })
  .refine((data) => data.password === data.confirm, {
    params: { i18n: "confirm" },
    path: ["confirm"],
  });

interface PasswordProps {
  handlePasswordSubmit: (password: string) => void;
}
const Password = ({ handlePasswordSubmit }: PasswordProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [fail, setFail] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      try {
        setLoading(false);
        setFail(false);
        setSuccess(true);
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
          (e.target as HTMLInputElement).blur();
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
                  <InputShowHide placeholder={t("password")} {...field} />
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
                    placeholder={t("confirm")}
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
              {loading ? (
                <Loader className="animate-spin" />
              ) : success ? (
                <SuccessIcon />
              ) : (
                <ArrowRight />
              )}
            </button>
            {fail && <Fail className="w-5 h-5 text-sm" />}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Password;
