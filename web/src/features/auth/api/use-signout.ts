import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const useSignOut = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const signOut = async () => {
    const result = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
        onError: () => {
          setLoading(false);
          toast.error("Une erreur s'est produite lors de la déconnexion.");
        },
      },
    });
    return result;
  };

  return { signOut, loading };
};

export default useSignOut;
