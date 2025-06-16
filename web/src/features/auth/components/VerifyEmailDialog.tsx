import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import VerifyEmailForm from "./VerifyEmailForm"
import useSendVerifyEmail from "../api/use-send-verify-email"
import React from "react"


type VerifyEmailDialogProps = {
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyEmailDialog: React.FC<VerifyEmailDialogProps> = ({
  isOpenDialog,
  setIsOpenDialog,
  setShowAlert,
}) => {
  const { sendVerifyEmail, loading } = useSendVerifyEmail();
  const formId = "verify-email-form";

  return (
    <Dialog
      open={isOpenDialog}
      onOpenChange={setIsOpenDialog}
    >
      <form>
        <DialogContent className="sm:max-w-[435px] space-y-2">
          <DialogHeader>
            <DialogTitle>Vérifier votre adresse.</DialogTitle>
            <DialogDescription>
              Recevoir un lien par mail pour la vérification de votre adresse.
            </DialogDescription>
          </DialogHeader>
          <div className="mb-4">
            <VerifyEmailForm
              formId={formId}
              sendVerifyEmail={sendVerifyEmail}
              setIsOpenDialog={setIsOpenDialog}
              setShowAlert={setShowAlert}
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

export default VerifyEmailDialog