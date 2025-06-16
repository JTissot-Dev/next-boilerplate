"use client";


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
import { Button } from "@/components/ui/button";
import SignInGitHub from "./SignInGitHub";
import EmailNotVerifyAlert from "./EmailNotVerifyAlert";
import EmailVerifyAlert from "./EmailVerifyAlert";
import SendResetPasswordDialog from "./SendResetPasswordDialog";
import useLoginForm from "../hooks/use-login-form";


const LoginForm: React.FC = () => {
  const {
    form,
    onSubmit,
    loading,
    showEmailNotVerifyAlert,
    setEmailNotVerifyAlert,
    showEmailVerifyAlert,
    setEmailVerifyAlert,
    isOpenSendResetPasswordDialog,
    setIsOpenSendResetPasswordDialog,
  } = useLoginForm();

  return (
    <>
      <EmailNotVerifyAlert
        showAlert={showEmailNotVerifyAlert}
        setShowAlert={setEmailNotVerifyAlert}
      />
      <EmailVerifyAlert
        showAlert={showEmailVerifyAlert}
        setShowAlert={setEmailVerifyAlert}
      />
      <SendResetPasswordDialog
        isOpenDialog={isOpenSendResetPasswordDialog}
        setIsOpenDialog={setIsOpenSendResetPasswordDialog}
      />
      <div className="w-full mx-auto py-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-center">Se connecter</h1>
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
                  <FormDescription>Doit contenir au moins 6 caractères.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <SignInGitHub />
          </form>
          <div className="text-center text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}

export default LoginForm;