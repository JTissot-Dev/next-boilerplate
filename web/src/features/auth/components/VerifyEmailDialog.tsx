import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import VerifyEmailForm from "./VerifyEmailForm";
import useVerifyEmailForm from "../hooks/use-verify-email-form";
import LoadingButton from "@/components/common/LoadingButton";

type VerifyEmailDialogProps = {
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const VerifyEmailDialog: React.FC<VerifyEmailDialogProps> = ({
  isOpenDialog,
  setIsOpenDialog,
}) => {
  const { form, onSubmit, loading } = useVerifyEmailForm();
  const formId = "verify-email-form";

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
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
      </form>
    </Dialog>
  );
};

export default VerifyEmailDialog;
