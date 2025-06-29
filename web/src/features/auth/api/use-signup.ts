"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SignupCredentials from "../types/SignupCredentials";
import { toast } from "sonner";

const useSignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signUp = async (values: SignupCredentials) => {
    const result = await authClient.signUp.email(values, {
      onRequest: () => setLoading(true),
      onSuccess: () => {
        setLoading(false);
        toast.info(
          "Inscription réussie ! Veuillez vérifier votre e-mail pour confirmer votre compte.",
        );
        router.push("/login");
      },
      onError: () => {
        setLoading(false);
        toast.error(
          "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
        );
      },
    });
    return result;
  };

  return { signUp, loading };
};

export default useSignUp;
