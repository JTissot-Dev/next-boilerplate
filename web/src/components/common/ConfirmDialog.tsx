import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


type ConfirmDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  onConfirm: () => void;
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  setIsOpen,
  title,
  description,
  onConfirm,
}) => {

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="default"
            onClick={() => {
              onConfirm();
              setIsOpen(false)
            }}
          >
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
