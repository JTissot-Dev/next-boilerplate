"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import LoginCredentials from "../types/LoginCredentials";
import { toast } from "sonner";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signIn = async (values: LoginCredentials) => {
    const result = await authClient.signIn.email(values, {
      onRequest: () => {
        setError(null);
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
        router.push("/dashboard");
      },
      onError: (ctx) => {
        setLoading(false);
        switch (ctx.error.message) {
          case "Email not verified":
            setError("Email not verified");
            break;
          case "Invalid email or password":
            toast.error("Email ou mot de passe invalide. Veuillez réessayer.");
            break;
          default:
            toast.error(
              "Une erreur s'est produite. Veuillez réessayer plus tard.",
            );
            break;
        }
      },
    });
    return result;
  };

  return { signIn, loading, error };
};

export default useSignIn;
