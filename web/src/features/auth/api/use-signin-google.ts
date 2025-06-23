"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const useSignInGoogle = () => {
  const [loading, setLoading] = useState(false);

  const signInGoogle = async () => {
    const result = await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
          toast.error(
            "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
          );
        },
      },
    );
    return result;
  };

  return { signInGoogle, loading };
};

export default useSignInGoogle;
