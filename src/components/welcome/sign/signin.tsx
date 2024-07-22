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
import { z } from "@/i18";
import { handleRSAEncrypt } from "@/lib/encryption";
import { cn } from "@/lib/utils";
import { fetchLogin } from "@/request/account";
import { useAppDispatch } from "@/states/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .refine((value) => /^[a-zA-Z0-9#?!@$%^&*-]{6,255}/.test(value), {
      params: { i18n: "password" },
    }),
});

interface SignInProps {
  open: boolean;
}

const SignIn = ({ open }: SignInProps) => {
  const { t } = useTranslation(["translation", "message"]);
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setFail(false);
      setLoading(true);

      const _data = {
        ...data,
        password: handleRSAEncrypt(data.password) || "",
      };
      const {
        defaultExpanded,
        showExactTime,
        sortInfo,
        language,
        theme,
        ...rest
      } = await fetchLogin(_data);
      dispatch({
        type: "account/setAccount",
        payload: rest,
      });
      const systemConfig = {
        language: language,
        theme: theme,
      };
      dispatch({
        type: "account/setConfig",
        payload: systemConfig,
      });
      const noteConfig = {
        showExactTime: showExactTime,
        defaultExpanded: defaultExpanded,
        sortInfo: sortInfo,
      };
      dispatch({
        type: "note/setConfig",
        payload: noteConfig,
      });
      toast.success(t("signin-success", { ns: "message" }));
      navigate("/");
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
        (e.target as HTMLInputElement).blur();
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
                    <InputWithLabel placeholder={t("email")} {...field} />
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
                        placeholder={t("password")}
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
