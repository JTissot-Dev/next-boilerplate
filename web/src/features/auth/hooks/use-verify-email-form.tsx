import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useSendVerifyEmail from "../api/use-send-verify-email";

const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
});

export type VerifyEmailFormValues = z.infer<typeof formSchema>;

const useVerifyEmailForm = () => {
  const { sendVerifyEmail, loading } = useSendVerifyEmail();

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: VerifyEmailFormValues) => {
    sendVerifyEmail(values.email);
  };

  return {
    form,
    onSubmit,
    loading,
  };
};

export default useVerifyEmailForm;
