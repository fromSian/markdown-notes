import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import InputWithLabel from "@/components/ui/input-with-label";
import { z } from "@/i18";
import { cn } from "@/lib/utils";
import { Step } from "@/types/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface EmailProps {
  setEmail: Dispatch<SetStateAction<string>>;
  step: Step;
  setStep: Dispatch<SetStateAction<Step>>;
  sendVerificationCode: (email: string) => void;
}

const formSchema = z.object({
  email: z.string().email(),
});
const Email = ({
  setEmail,
  step,
  setStep,
  sendVerificationCode,
}: EmailProps) => {
  const { t } = useTranslation(["translation", "message"]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      setEmail(data.email);
      await sendVerificationCode(data.email);
      setStep("code");
      toast.success(t("send-code-success", { ns: "message" }));
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
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithLabel
                    placeholder={t("email")}
                    {...field}
                    onChange={(event) => {
                      const { onChange } = field;
                      onChange(event);
                      setStep("email");
                    }}
                    onKeyDown={onEnter}
                    extraNode={
                      <button
                        disabled={loading}
                        className={cn(
                          "absolute right-2 p-1 cursor-pointer text-ttertiary border rounded-full text-center transition-all scale-x-100",
                          step != "email" && "scale-x-0"
                        )}
                        type="submit"
                        style={{
                          bottom: "6px",
                        }}
                      >
                        {loading ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          <ArrowRight size={16} />
                        )}
                      </button>
                    }
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center gap-4"></div>
        </form>
      </Form>
    </div>
  );
};

export default Email;
