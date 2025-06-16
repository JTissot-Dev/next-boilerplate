import { CheckCircle2Icon, X } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";


type EmailVerifyAlertProps = {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}
const EmailVerifyAlert: React.FC<EmailVerifyAlertProps> = ({
  showAlert,
  setShowAlert,
}) => {

  if (showAlert) return (
    <>
      <div
        className="flex justify-center fixed top-2 left-0 right-0 max-w-md mx-auto mt-4 px-6 md:px-10"
      >
        <Alert variant="default">
          <CheckCircle2Icon />
          <Button
            onClick={() => setShowAlert(false)}
            className="absolute top-2 right-2 h-6 w-6 p-0 hover:text-accent-destructive"
            variant="ghost"
            size="icon"
          >
            <X />
          </Button>
          <AlertTitle>Adresse email vérifié.</AlertTitle>
          <AlertDescription>
            <p>Votre adresse email a bien été vérifié, vous pouvez désormais vous connecté.</p>
          </AlertDescription>
        </Alert>
      </div>
    </>
  )
  return null;
}

export default EmailVerifyAlert;