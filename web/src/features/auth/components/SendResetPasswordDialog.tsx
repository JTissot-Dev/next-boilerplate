import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import SendResetPasswordForm from "./SendResetPasswordForm"
import useSendResetPasswordEmail from "../api/use-send-reset-password-email"


type SendResetPasswordDialogProps = {
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const SendResetPasswordDialog: React.FC<SendResetPasswordDialogProps> = ({
  isOpenDialog,
  setIsOpenDialog,
}) => {
  const { sendResetPasswordEmail, loading } = useSendResetPasswordEmail();
  const formId = "send-reset-password-form";

  return (
    <Dialog
      open={isOpenDialog}
      onOpenChange={setIsOpenDialog}
    >
      <form>
        <DialogContent className="sm:max-w-[435px] space-y-2">
          <DialogHeader>
            <DialogTitle>Réinitialisé votre mot de passe.</DialogTitle>
            <DialogDescription>
              Recevoir un lien par mail pour la mise à jour de votre mot de passe.
            </DialogDescription>
          </DialogHeader>
          <div className="mb-4">
            <SendResetPasswordForm
              formId={formId}
              sendResetPasswordEmail={sendResetPasswordEmail}
              setIsOpenDialog={setIsOpenDialog}
            />
          </div>
          <DialogFooter>
            <Button form={formId} type="submit" className="w-full" disabled={loading}>
              {loading ? "Envoi en cours..." : "Envoyer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default SendResetPasswordDialog