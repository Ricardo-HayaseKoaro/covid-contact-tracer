import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SecurityIcon from '@material-ui/icons/Security';
import PlaceIcon from '@material-ui/icons/Place';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  item: {
  },
  icon:{
    color: "#3f51b5",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function NestedList() {
  const classes = useStyles();
  const [openLocation, setOpenLocation] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [openAccount, setOpenAccount] = React.useState(false);
  const [openSecurity, setOpenSecurity] = React.useState(false);


  const handleClickLocation = () => {
    setOpenLocation(!openLocation);
  };

  const handleClickUpload = () => {
    setOpenUpload(!openUpload);
  };

  const handleClickAccount = () => {
    setOpenAccount(!openAccount);
  };
  
  const handleClickSecurity = () => {
    setOpenSecurity(!openSecurity);
  };

  return (
    <List
      className={classes.root}
    >
      <ListItem button onClick={handleClickLocation} className={classes.item}>
        <ListItemIcon>
          <PlaceIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="My locations" />
        {openLocation ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openLocation} timeout="auto" unmountOnExit>
        <Box>
          <Typography>teta</Typography>
        </Box>
      </Collapse>
      <ListItem button onClick={handleClickUpload} className={classes.item}>
        <ListItemIcon>
          <CloudUploadIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Upload location history" />
        {openUpload ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openUpload} timeout="auto" unmountOnExit>

      </Collapse>
      <ListItem button onClick={handleClickAccount} className={classes.item}>
        <ListItemIcon>
          <AccountCircleIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="My account" />
        {openAccount ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openAccount} timeout="auto" unmountOnExit>

      </Collapse>
      <ListItem button onClick={handleClickSecurity} className={classes.item}>
        <ListItemIcon>
          <SecurityIcon className={classes.icon}/>
        </ListItemIcon>
        <ListItemText primary="Security" />
        {openSecurity ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSecurity} timeout="auto" unmountOnExit>

      </Collapse>
    </List>
  );
}

export default function ResponsiveDialog(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll="paper"
      >
        <DialogTitle style={{width: "85vw"}} id="responsive-dialog-title">{"Help"}</DialogTitle>
        <DialogContent style={{padding: "0px"}}>
           <NestedList/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

