import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const useSignOut = () => {
  const router = useRouter();

  const signOut = async () => {
    const result = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
    return result;
  };

  return { signOut };
};

export default useSignOut;
