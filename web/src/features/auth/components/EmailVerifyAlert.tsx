import { CheckCircle2Icon, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type EmailVerifyAlertProps = {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmailVerifyAlert: React.FC<EmailVerifyAlertProps> = ({
  showAlert,
  setShowAlert,
}) => {
  if (showAlert)
    return (
      <Alert variant="default" className="mb-2">
        <CheckCircle2Icon />
        <Button
          onClick={() => setShowAlert(false)}
          className="absolute top-2 right-2 h-6 w-6 p-0 hover:text-accent-destructive"
          variant="ghost"
          size="icon"
        >
          <X />
        </Button>
        <AlertTitle>Adresse email vérifiée.</AlertTitle>
        <AlertDescription>
          <p>
            Votre adresse email a bien été vérifiée, vous pouvez désormais vous
            connecté.
          </p>
        </AlertDescription>
      </Alert>
    );
  return null;
};

export default EmailVerifyAlert;
