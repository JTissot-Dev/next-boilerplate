import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useSignIn from "../api/use-signin";

// Schéma de validation Zod
const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

export type LoginFormValues = z.infer<typeof formSchema>;

const useLoginForm = () => {
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");

  const { signIn, loading, error } = useSignIn();
  const [showEmailNotVerifyAlert, setEmailNotVerifyAlert] = useState<boolean>(false);
  const [showEmailVerifyAlert, setEmailVerifyAlert] = useState<boolean>(false);
  const [isOpenSendResetPasswordDialog, setIsOpenSendResetPasswordDialog] = useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    signIn(values);
  };

  useEffect(() => {
    if (error === "Email not verified") {
      setEmailNotVerifyAlert(true);
    }
  }, [error]);

  useEffect(() => {
    if (verified) setEmailVerifyAlert(true);
  }, [verified]);

  return {
    form,
    onSubmit,
    loading,
    showEmailNotVerifyAlert,
    setEmailNotVerifyAlert,
    showEmailVerifyAlert,
    setEmailVerifyAlert,
    isOpenSendResetPasswordDialog,
    setIsOpenSendResetPasswordDialog,
  };
};

export default useLoginForm;