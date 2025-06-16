"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schéma de validation Zod
const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
});

type SendResetPasswordFormValues = z.infer<typeof formSchema>;

type SendResetPasswordFormProps = {
  formId: string;
  sendResetPasswordEmail: (email: string) => void;
  setIsOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
}
const SendResetPasswordForm: React.FC<SendResetPasswordFormProps> = ({
  formId,
  sendResetPasswordEmail,
  setIsOpenDialog,
}) => {


  const form = useForm<SendResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: SendResetPasswordFormValues) => {
    sendResetPasswordEmail(values.email);
    if (setIsOpenDialog) setIsOpenDialog(false);
  };

  return (

    <Form {...form}>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>L’adresse email de votre compte.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default SendResetPasswordForm;