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
import MapIcon from '@material-ui/icons/Map';
import WarningIcon from '@material-ui/icons/Warning';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  info: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  subtitle:{
    width: '88%',
    marginBottom: '2vh'
  },
  txt:{
    marginInline: '4vw',
    marginBottom: '2vh'
  },
  img:{
    width: '30vw',
    marginBottom: '2vh'
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
  const [openMap, setOpenMap] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [openAccount, setOpenAccount] = React.useState(false);
  const [openSecurity, setOpenSecurity] = React.useState(false);


  const handleClickLocation = () => {
    setOpenLocation(!openLocation);
  };

  const handleClickMap = () => {
    setOpenMap(!openMap);
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
      <Divider/>
      <ListItem button style={{backgroundColor: openLocation ? grey[300] : '' }} onClick={handleClickLocation} className={classes.item}>
        <ListItemIcon>
          <PlaceIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Undestanding my Location Timeline" />
        {openLocation ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openLocation} timeout="auto" unmountOnExit>
        <Divider/>
        <Box className={classes.info}>
          <br/>
          <Typography variant="h6" className={classes.subtitle}>
            Location:
          </Typography>
          <Typography variant="body1" className={classes.txt}>
            Each item represents a place that you visited, ordered in chronological order. You can click the place icon to see the location on the map. Don't upload the same locations or another users locations in your account, time and date needs to be unique. 
          </Typography>
          <Typography variant="body1" className={classes.txt}>
            By clicking the location you will be abre to see details about the place, like number of people that you entered in contact, and the number of notification(possible encounters with infected people).
          </Typography>
          <img src={"../../../static/helpImages/Location.png" } className={classes.img} />
          <Typography variant="body1" className={classes.txt}>
            Here you can notify (alert) another users about your infection or delete the location from the database.
          </Typography>
          <img src={"../../../static/helpImages/LocationCard.png" } className={classes.img} />
          <br/>
          <Typography variant="h6" className={classes.subtitle} >
            Alerts:
          </Typography>
          <Typography variant="body1" className={classes.txt}>
            A location is marked as a yellow alert when you notified this place as a possible infected. 
          </Typography>
          <img src={"../../../static/helpImages/YellowAlert.png" } className={classes.img} />
          <Typography variant="body1" className={classes.txt}>
            A location is marked as a red alert when another user notified this place as a possible infected. In this case keep attempt to COVID-19 symptoms and follow the instructions provided by the health authorities.
          </Typography>
          <img src={"../../../static/helpImages/RedAlert.png" } className={classes.img} />
          <Typography variant="body1" className={classes.txt}>
            When a location is notified by you and another user, it will display as a red alert and a text bellow the time will display that you notified too.
          </Typography>
          <img src={"../../../static/helpImages/DoubleAlert.png" } className={classes.img} />
          <br/>
        </Box>
      </Collapse>
      <Divider/>
      <ListItem button onClick={handleClickMap} className={classes.item}>
        <ListItemIcon>
          <MapIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="Undestanding my Timeline Map" />
        {openMap ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openMap} timeout="auto" unmountOnExit>
      <Divider/>
        <Box className={classes.info}>
          <br/>
          <Typography variant="h6" className={classes.subtitle} >
            Map:
          </Typography>
          <img src={"../../../static/helpImages/Map.png" } className={classes.img} />
          <Typography variant="body1" className={classes.txt}>
            Map all your timeline, be careful that is possible that multiple locations stack, when this happens, the alerts will be on top. You can click the icon to view more datails.
          </Typography>
          <Typography variant="body1" className={classes.txt}>
            <WarningIcon style={{ color: 'FDB606' }} />
            A location is marked as a yellow alert when you notified this place as a possible infected. 
          </Typography>
          <Typography variant="body1" className={classes.txt}>
            <WarningIcon style={{ color: red[500] }} />
            A location is marked as a red alert when another user notified this place as a possible infected. In this case keep attempt to COVID-19 symptoms and follow the instructions provided by the health authorities.
          </Typography>
          <Typography variant="body1" className={classes.txt}>
            <WarningIcon style={{ color: red[500] }} />
            When a location is notified by you and another user, it will display as a red alert and a text bellow the time will display that you notified too.
          </Typography>
          <br/>
          <Typography variant="h6" className={classes.subtitle}>
            HeatMap:
          </Typography>
          <Typography variant="body1" className={classes.txt}>
            Show in a format of heatmap the places that you visited, more brighter more is the density.
          </Typography>
          <img src={"../../../static/helpImages/HeatMap.png" } className={classes.img} />
          <br/>
        </Box>
      </Collapse>
      <Divider/>

      <ListItem button onClick={handleClickUpload} className={classes.item}>
        <ListItemIcon>
          <CloudUploadIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="How Upload my Location History" />
        {openUpload ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openUpload} timeout="auto" unmountOnExit>
      <Divider/>
      <Box className={classes.info}>
          <br/>
          <Typography variant="h6" className={classes.subtitle} >
            Step 1: Sign in to your Google Account
          </Typography>
          <Typography variant="body1" className={classes.txt}>
            Google store all your data, wich includes your geographic location. We will use that data, to analyze and compare with other users data, when a contact happens. Don't worry only you have acess to your data in Contact Tracerr. 
          </Typography>
          <img src={"../../../static/helpImages/Login.png" } className={classes.img} />
          <Typography variant="h6" className={classes.subtitle} >
            Step 2: Go to Google Takeout
          </Typography>
          <img src={"../../../static/helpImages/Takeout.png" } className={classes.img} />
          <Typography variant="body1" className={classes.txt}>
            In "Multiple formats" choose JSON 
          </Typography>
          <img src={"../../../static/helpImages/TakeoutFormat.png" } className={classes.img} />
          <Typography variant="body1" className={classes.txt}>
            Click "Next step"
          </Typography>
          <Typography variant="body1" className={classes.txt}>
            Choose your delivery method, frequency, file type, and maximum size. For our purpose just one export is enough, if you have a good network connection you can change the limit size to a larger one.
          </Typography>
          <img src={"../../../static/helpImages/TakeoutConfig.png" } className={classes.img} />
          <Typography variant="body1" className={classes.txt}>
            Click "Create export". This can take a few minutes, after that the export will be delivered to the place you chose in delivery method.
          </Typography>

          <Typography variant="h6" className={classes.subtitle} >
            Step 3: Extract and Upload
          </Typography>
          <Typography variant="body1" className={classes.txt}>
            Now extract your .zip or .tar file, it will contain all your data.
          </Typography>
          <Typography variant="body1" className={classes.txt}>
            Open folder "Takeout". Go to "Location History", inside this folder you will find all your location history in the file "Location History.json".
          </Typography>
          <Typography variant="body1" className={classes.txt}>
            We don't recommend using this file, because of the large size, what we recommend using the files inside the folder "Semantic Location History, that separates your history by year and month.          
          </Typography>
          <img src={"../../../static/helpImages/Folders.png" } className={classes.img} />
          <Typography variant="body1" className={classes.txt}>
            Now just use the upload tool in the website.
          </Typography>
          <img src={"../../../static/helpImages/Upload.png" } className={classes.img} />
          <br/>
        </Box>
      </Collapse>
      <Divider/>

      {/* <ListItem button onClick={handleClickAccount} className={classes.item}>
        <ListItemIcon>
          <AccountCircleIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary="My account" />
        {openAccount ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openAccount} timeout="auto" unmountOnExit>
      </Collapse>
      <Divider/>

      <ListItem button onClick={handleClickSecurity} className={classes.item}>
        <ListItemIcon>
          <SecurityIcon className={classes.icon}/>
        </ListItemIcon>
        <ListItemText primary="Security" />
        {openSecurity ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openSecurity} timeout="auto" unmountOnExit>
      </Collapse>
      <Divider/> */}

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

