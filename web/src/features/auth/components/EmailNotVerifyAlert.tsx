import { useState } from "react";
import { AlertCircleIcon, X } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import VerifyEmailDialog from "./VerifyEmailDialog";


type EmailNotVerifyAlertProps = {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}
const EmailNotVerifyAlert: React.FC<EmailNotVerifyAlertProps> = ({
  showAlert,
  setShowAlert,
}) => {

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  if (showAlert) return (
    <>
      <div className="flex justify-center fixed top-2 left-0 right-0 max-w-md mx-auto mt-4 px-6 md:px-10">
        <Alert variant="destructive">
          <AlertCircleIcon />
          <Button
            onClick={() => setShowAlert(false)}
            className="absolute top-2 right-2 h-6 w-6 p-0 hover:text-accent-destructive"
            variant="ghost"
            size="icon"
          >
            <X />
          </Button>
          <AlertTitle>Connexion impossible.</AlertTitle>
          <AlertDescription>
            <p>Un email de vérification a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception.</p>
            <Button
              onClick={() => setIsOpenDialog(true)}
              variant="link"
              className="p-0 h-fit"
            >
              Renvoyer l'e-mail de vérification.
            </Button>
          </AlertDescription>
        </Alert>
      </div>
      <VerifyEmailDialog isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog} setShowAlert={setShowAlert} />
    </>
  )
  return null;
}

export default EmailNotVerifyAlert;