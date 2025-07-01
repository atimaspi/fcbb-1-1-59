
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  destructive?: boolean;
  loading?: boolean;
}

const ConfirmationDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  destructive = false,
  loading = false
}: ConfirmationDialogProps) => {
  const handleCancel = () => {
    if (onCancel) onCancel();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
    if (!loading) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" role="alertdialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {destructive && (
              <AlertTriangle 
                className="h-5 w-5 text-destructive" 
                aria-hidden="true"
              />
            )}
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <AccessibleButton
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
            ariaLabel={`${cancelText} a ação`}
          >
            {cancelText}
          </AccessibleButton>
          <AccessibleButton
            variant={destructive ? "destructive" : "default"}
            onClick={handleConfirm}
            loading={loading}
            loadingText="A processar..."
            ariaLabel={`${confirmText} a ação`}
          >
            {confirmText}
          </AccessibleButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ConfirmationDialog };
