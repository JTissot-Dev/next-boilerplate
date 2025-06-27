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
      onError: (ctx) => {
        setLoading(false);
        switch (ctx.error.message) {
          case "User already exists":
            toast.error("Un compte utilisateur est déjà associé à cet email.");
            break;
          default:
            toast.error(
              "Une erreur s'est produite lors de l'inscription. Veuillez vérifier les informations saisies.",
            );
            break;
        }
      },
    });
    return result;
  };

  return { signUp, loading };
};

export default useSignUp;
