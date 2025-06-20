import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/common/LoadingButton";
import SendResetPasswordForm from "./SendResetPasswordForm";
import useSendResetPasswordForm from "../hooks/use-send-reset-password-form";

type SendResetPasswordDialogProps = {
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const SendResetPasswordDialog: React.FC<SendResetPasswordDialogProps> = ({
  isOpenDialog,
  setIsOpenDialog,
}) => {
  const { form, onSubmit, loading } = useSendResetPasswordForm();
  const formId = "send-reset-password-form";

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
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
            form={form}
            onSubmit={onSubmit}
            setIsOpenDialog={setIsOpenDialog}
          />
        </div>
        <DialogFooter>
          <LoadingButton
            loading={loading}
            loadingText="Envoi en cours..."
            className="w-full"
            type="submit"
            form={formId}
          >
            Envoyer
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendResetPasswordDialog;
