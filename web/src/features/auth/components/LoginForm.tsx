"use client";

import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SignInGitHub from "./SignInGitHub";
import useLoginForm from "../hooks/use-login-form";
import LoadingButton from "@/components/common/LoadingButton";
import { useAuthContext } from "../context";

const LoginForm: React.FC = () => {
  const { form, onSubmit, loading } = useLoginForm();
  const { setIsOpenSendResetPasswordDialog } = useAuthContext();

  return (
    <>
      <div className="w-full mx-auto py-10 space-y-4">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-center leading-6">
            Se connecter
          </h1>
          <p className="text-muted-foreground text-balance text-center">
            Accédez à votre espace personnel
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Mot de passe</FormLabel>
                    <a
                      onClick={() => setIsOpenSendResetPasswordDialog(true)}
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline hover:cursor-pointer"
                    >
                      Mot de passe oublié?
                    </a>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              loading={loading}
              className="w-full"
              type="submit"
              loadingText="Connexion..."
            >
              Se connecter
            </LoadingButton>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Ou continuez avec
              </span>
            </div>
            <SignInGitHub />
          </form>
          <div className="text-center text-sm mt-6">
            Pas encore de compte?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              S&apos;inscrire
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
