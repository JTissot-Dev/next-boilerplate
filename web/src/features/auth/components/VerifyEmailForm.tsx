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

type VerifyEmailFormValues = z.infer<typeof formSchema>;

type VerifyEmailFormProps = {
  formId: string;
  sendVerifyEmail: (email: string) => void;
  setIsOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
}
const VerifyEmailForm: React.FC<VerifyEmailFormProps> = ({
  formId,
  sendVerifyEmail,
  setIsOpenDialog,
  setShowAlert,
}) => {


  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: VerifyEmailFormValues) => {
    console.log("Form submitted with values:", values);
    sendVerifyEmail(values.email);
    if (setIsOpenDialog) setIsOpenDialog(false);
    if (setShowAlert) setShowAlert(false);
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
              <FormDescription>L’adresse email à vérifier.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default VerifyEmailForm;