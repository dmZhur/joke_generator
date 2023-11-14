import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

export interface WarningModalProps extends DialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
  contentText: string;
  buttonText?: string;
}

export const WarningModal: FC<WarningModalProps> = ({
  open,
  onClose,
  contentText,
  buttonText,
  ...props
}) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog {...props} onClose={handleClose} open={open}>
      <DialogContent>
        <Typography variant="h6">{contentText}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          {buttonText || 'Okey'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
