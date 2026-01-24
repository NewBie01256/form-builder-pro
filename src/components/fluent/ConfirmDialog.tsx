/**
 * Fluent UI Confirm Dialog
 * 
 * A centralized confirmation dialog using Fluent UI components.
 * Replaces the shadcn AlertDialog for consistent styling.
 */

import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Warning24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  surface: {
    maxWidth: "450px",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  warningIcon: {
    color: tokens.colorPaletteRedForeground1,
  },
  description: {
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalS,
  },
  actions: {
    paddingTop: tokens.spacingVerticalL,
  },
});

interface ConfirmDialogProps {
  trigger: ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: "destructive" | "default";
}

export const ConfirmDialog = ({
  trigger,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  variant = "destructive",
}: ConfirmDialogProps) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ display: 'contents' }}>
        {trigger}
      </span>
      <Dialog open={open} onOpenChange={(_, data) => setOpen(data.open)}>
        <DialogSurface className={styles.surface}>
          <DialogBody>
            <DialogTitle>
              <div className={styles.titleRow}>
                {variant === "destructive" && (
                  <Warning24Regular className={styles.warningIcon} />
                )}
                {title}
              </div>
            </DialogTitle>
            <DialogContent>
              <p className={styles.description}>{description}</p>
            </DialogContent>
            <DialogActions className={styles.actions}>
              <Button appearance="secondary" onClick={() => setOpen(false)}>
                {cancelText}
              </Button>
              <Button
                appearance="primary"
                onClick={handleConfirm}
                style={variant === "destructive" ? { 
                  backgroundColor: tokens.colorPaletteRedBackground3,
                  color: tokens.colorNeutralForegroundOnBrand,
                } : undefined}
              >
                {confirmText}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
