import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const resetPassword = (newPassword: string, token: string) => {
    return authClient.resetPassword(
      {
        newPassword: newPassword,
        token: token,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          router.push("/login");
          toast.success("Votre mot de passe a été réinitialisé avec succès.");
        },
        onError: (ctx) => {
          setLoading(false);
          switch (ctx.error.message) {
            case "invalid token":
              toast.error(
                "Le lien de réinitialisation du mot de passe est invalide ou a expiré.",
              );
              break;
            default:
              toast.error(
                "Une erreur s'est produite lors de la réinitialisation du mot de passe.",
              );
              break;
          }
        },
      },
    );
  };
  return { resetPassword, loading };
};

export default useResetPassword;
