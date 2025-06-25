import { useState } from "react";
import { Mail, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import VerifyEmailDialog from "./VerifyEmailDialog";

type EmailNotVerifyAlertProps = {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmailNotVerifyAlert: React.FC<EmailNotVerifyAlertProps> = ({
  showAlert,
  setShowAlert,
}) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  if (showAlert)
    return (
      <>
        <Alert className="mb-2">
          <Mail />
          <Button
            onClick={() => setShowAlert(false)}
            className="absolute top-2 right-2 h-6 w-6 p-0 hover:text-accent-destructive rouded-sm md:rounded-lg"
            variant="ghost"
            size="icon"
          >
            <X />
          </Button>
          <AlertTitle>Vérifiez votre email.</AlertTitle>
          <AlertDescription>
            <p>Un email de vérification a été envoyé à votre adresse.</p>
            <Button
              onClick={() => setIsOpenDialog(true)}
              variant="link"
              className="p-0 h-fit"
            >
              Renvoyer l&apos;email de vérification.
            </Button>
          </AlertDescription>
        </Alert>
        <VerifyEmailDialog
          isOpenDialog={isOpenDialog}
          setIsOpenDialog={setIsOpenDialog}
        />
      </>
    );
  return null;
};

export default EmailNotVerifyAlert;
