"use client"

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";


const useSignInGitHub = () => {

  const [loading, setLoading] = useState(false);

  const signInGitHub = async () => {
    const result = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard"
    },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
        }
      })
    return result;
  };

  return { signInGitHub, loading };
};

export default useSignInGitHub;