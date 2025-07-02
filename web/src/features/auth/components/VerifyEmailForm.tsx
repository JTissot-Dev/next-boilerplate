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
import type { VerifyEmailFormValues } from "../hooks/use-verify-email-form";

type VerifyEmailFormProps = {
  formId: string;
  form: UseFormReturn<{
    email: string;
  }>;
  onSubmit: (values: VerifyEmailFormValues) => void;
  setIsOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};
const VerifyEmailForm: React.FC<VerifyEmailFormProps> = ({
  formId,
  form,
  onSubmit,
  setIsOpenDialog,
}) => {
  return (
    <Form {...form}>
      <form
        id={formId}
        data-testid={formId}
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
                L&apos;adresse email à vérifier.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default VerifyEmailForm;
