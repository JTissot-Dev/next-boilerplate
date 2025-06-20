import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const useSendVerifyEmail = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const sendVerifyEmail = async (userMail: string) => {
    const result = await authClient.sendVerificationEmail(
      {
        email: userMail,
        callbackURL: "/login?verified=1",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          toast.success(
            "Un email de vérification a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception.",
          );
        },
        onError: () => {
          setLoading(false);
          toast.error("Une erreur s'est produite lors de l'envoi de l'email. Veuillez réessayer plus tard.");
        },
      },
    );
    return result;
  };

  return { sendVerifyEmail, loading, setLoading };
};

export default useSendVerifyEmail;
