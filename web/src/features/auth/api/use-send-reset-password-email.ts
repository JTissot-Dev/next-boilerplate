import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const useSendResetPasswordEmail = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const sendResetPasswordEmail = async (email: string) => {
    const result = await authClient.requestPasswordReset(
      {
        email: email,
        redirectTo: "/reset-password",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          toast.success("Un lien de réinitialisation a été envoyé par email.");
        },
        onError: () => {
          setLoading(false);
          toast.error("Une erreur s'est produite lors de l'envoi de l'email. Veuillez réessayer plus tard.");
        },
      },
    );
    return result;
  };
  return { sendResetPasswordEmail, loading };
};

export default useSendResetPasswordEmail;
