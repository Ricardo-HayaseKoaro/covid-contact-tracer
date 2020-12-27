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
                <DialogTitle >{"Notify possible infection"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to notify a possible COVID-19 infection ? All users that you entered in contact will be notified.
                        Check your symptoms.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="primary" target="_blank" href={"https://www.who.int/health-topics/coronavirus#tab=tab_3"} onClick={props.handleClose}>
                        I am not sure
                    </Button>
                    <Button autoFocus color="primary" onClick={props.handleClose}>
                        No
                    </Button>
                    <Button color="primary" onClick={props.handleNotify}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
