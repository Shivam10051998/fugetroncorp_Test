import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const { forwardRef, useImperativeHandle } = React;

const AlertDialog = forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const {
    tittle,
    okText,
    CancelText,
    contentText,
    functionName,
    tiitleColor,
    tiitleSize,
  } = props.data;
  useImperativeHandle(ref, () => ({
    dialogOpen() {
      setOpen(true);
    },
    dialogClose() {
      setOpen(false);
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ color: tiitleColor, fontSize: tiitleSize }}
        >
          {tittle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{CancelText}</Button>
          <Button onClick={() => functionName()} autoFocus>
            {okText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default AlertDialog;
