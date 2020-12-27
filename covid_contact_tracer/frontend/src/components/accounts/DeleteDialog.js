import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function ResponsiveDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>     
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogTitle >{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account ? All your data will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus  color="primary">
            No
          </Button>
          <Button  color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
