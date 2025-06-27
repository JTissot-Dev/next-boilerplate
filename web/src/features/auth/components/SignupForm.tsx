"use client";

import { useState } from "react";
import Link from "next/link";
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
import LoadingButton from "@/components/common/LoadingButton";
import useSignupForm from "../hooks/use-signup-form";
import PasswordInput from "./PasswordInput";
import PasswordStrengthIndicator from "./PasswordStrenghtIndicator";

const SignupForm: React.FC = () => {
  const { form, onSubmit, loading } = useSignupForm();
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Saisissez votre nom"
                  {...field}
                />
              </FormControl>
              <FormDescription>Votre nom d&apos;utilisateur.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
                L&apos;adresse email utilisée pour se connecter.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          loading={loading}
          loadingText="Création du compte..."
          className="w-full"
          type="submit"
        >
          S&apos;inscrire
        </LoadingButton>
      </form>
      <div className="text-center text-sm mt-6">
        Vous avez déjà un compte?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Se connecter
        </Link>
      </div>
    </Form>
  );
};

export default SignupForm;
