"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingButton from "@/components/common/LoadingButton";
import ResetPasswordForm from "./ResetPasswordForm";
import useResetPasswordForm from "../hooks/use-reset-password-form";

const ResetPasswordCard: React.FC = () => {
  const { loading, form, onSubmit } = useResetPasswordForm();
  const formId = "reset-password-form";

  return (
    <Card className="w-full sm:w-[400px] overflow-hidden">
      <CardHeader className="text-center">
        <CardTitle>Réinitialiser votre mot de passe</CardTitle>
        <CardDescription>
          Veuillez saisir votre nouveau mot de passe pour continuer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="my-2">
          <ResetPasswordForm formId={formId} form={form} onSubmit={onSubmit} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <LoadingButton
          form={formId}
          type="submit"
          className="w-full"
          loading={loading}
          loadingText="Chargement en cours..."
        >
          Valider
        </LoadingButton>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordCard;
