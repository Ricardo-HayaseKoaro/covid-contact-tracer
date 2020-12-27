import React from 'react';
import Dialog from '@material-ui/core/Dialog';
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
        scroll="paper"
      >
        <DialogTitle id="responsive-dialog-title">{"Help"}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Mano escrever altos tutos aqui
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
