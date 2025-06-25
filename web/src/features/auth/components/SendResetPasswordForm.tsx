"use client";

import type { UseFormReturn } from "react-hook-form";
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
import type { SendResetPasswordFormValues } from "../hooks/use-send-reset-password-form";

type SendResetPasswordFormProps = {
  formId: string;
  form: UseFormReturn<
    {
      email: string;
    },
    any,
    {
      email: string;
    }
  >;
  onSubmit: (values: SendResetPasswordFormValues) => void;
  setIsOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SendResetPasswordForm: React.FC<SendResetPasswordFormProps> = ({
  formId,
  form,
  onSubmit,
  setIsOpenDialog,
}) => {
  return (
    <Form {...form}>
      <form
        data-testid={formId}
        id={formId}
        onSubmit={form.handleSubmit((values) => {
          onSubmit(values);
          if (setIsOpenDialog) setIsOpenDialog(false);
        })}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>
                L&apos;adresse email de votre compte.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SendResetPasswordForm;
