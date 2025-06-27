import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useResetPassword from "../api/use-reset-password";

// Schéma de validation Zod
const formSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

export type ResetPasswordFormValues = z.infer<typeof formSchema>;

const useResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const { resetPassword, loading } = useResetPassword();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    const result = await resetPassword(values.password, token);
    if (!result?.error) form.reset();
  };

  return {
    form,
    onSubmit,
    loading,
  };
};

export default useResetPasswordForm;
