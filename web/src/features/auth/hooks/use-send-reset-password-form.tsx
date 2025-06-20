import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSendResetPasswordEmail from "../api/use-send-reset-password-email";

const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
});

export type SendResetPasswordFormValues = z.infer<typeof formSchema>;

const useSendResetPasswordForm = () => {
  const { sendResetPasswordEmail, loading } = useSendResetPasswordEmail();

  const form = useForm<SendResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: SendResetPasswordFormValues) => {
    sendResetPasswordEmail(values.email);
  };

  return {
    form,
    onSubmit,
    loading,
  };
};

export default useSendResetPasswordForm;
