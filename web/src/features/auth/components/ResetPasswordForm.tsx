"use client";

import { useState } from "react";
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
import PasswordInput from "./PasswordInput";
import PasswordStrengthIndicator from "./PasswordStrenghtIndicator";
import { ResetPasswordFormValues } from "../hooks/use-reset-password-form";

type ResetPasswordFormProps = {
  formId: string;
  form: UseFormReturn<{
    password: string;
  }>;
  onSubmit: (values: ResetPasswordFormValues) => void;
};

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  formId,
  form,
  onSubmit,
}) => {
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  onFocus={() => {
                    setIsPasswordFocused(true);
                  }}
                  onBlur={() => {
                    field.onBlur();
                    setIsPasswordFocused(false);
                  }}
                />
              </FormControl>
              <PasswordStrengthIndicator
                password={field.value || ""}
                focus={isPasswordFocused}
              />
              <FormDescription>
                Doit contenir au moins 6 caractères.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
