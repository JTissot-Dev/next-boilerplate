import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignUp from "../api/use-signup";

// Schéma de validation Zod
const formSchema = z.object({
  name: z
    .string()
    .min(6, {
      message: "Le nom d'utilisateur doit contenir au moin 6 caractères",
    }),
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

type SignupFormValues = z.infer<typeof formSchema>;

const useSignupForm = () => {
  const { signUp, loading } = useSignUp();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    const result = await signUp(values);
    if (result) form.reset();
  };

  return {
    form,
    onSubmit,
    loading,
  };
};

export default useSignupForm;
