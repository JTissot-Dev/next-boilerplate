"use client";

import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import useSignUp from "../api/use-signup";

// Schéma de validation Zod
const formSchema = z.object({
  name: z
    .string()
    .min(6, { message: "Le nom d'utilisateur doit contenir au moin 6 caractères" }),
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

type SignupFormValues = z.infer<typeof formSchema>;

const SignupForm: React.FC = () => {

  const { signUp, loading } = useSignUp();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    signUp(values);
  };

  return (
    <div className="w-full mx-auto py-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-center">S'inscrire</h1>
        <p className="text-muted-foreground text-balance text-center">
          Créez votre compte utilisateur
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Saisissez votre nom" {...field} />
                </FormControl>
                <FormDescription>Votre nom d'utilisateur.</FormDescription>
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
                <FormDescription>L’adresse email utilisée pour se connecter.</FormDescription>
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
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>Doit contenir au moins 6 caractères.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Création du compte..." : "S’inscrire"}
          </Button>
        </form>
        <div className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            login
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default SignupForm;