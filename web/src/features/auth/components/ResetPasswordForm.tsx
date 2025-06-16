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
import { ResetPasswordFormValues } from "../hooks/use-reset-password-form";

type ResetPasswordFormProps = {
  formId: string;
  form: UseFormReturn<{
    password: string;
  }, any, {
    password: string;
  }>;
  onSubmit: (values: ResetPasswordFormValues) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  formId,
  form,
  onSubmit
}) => {

  return (
    <Form {...form}>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormDescription>Doit contenir au moins 6 caractères.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default ResetPasswordForm;