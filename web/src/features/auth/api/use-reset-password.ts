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
          console.error("Error resetting password:", ctx);
        },
      },
    );
  };
  return { resetPassword, loading };
};

export default useResetPassword;
