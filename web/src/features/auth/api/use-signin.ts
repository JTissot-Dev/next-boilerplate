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
        if (ctx.error.message === "Email not verified") {
          setError(ctx.error.message);
        } else {
          toast.error(
            "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
          );
        }
      },
    });
    return result;
  };

  return { signIn, loading, error };
};

export default useSignIn;
