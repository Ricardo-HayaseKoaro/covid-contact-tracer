import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Modal from '../layout/Modal';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import ListItems from './listItems';
import NotificationsPopup from '../notifications/NotificationsPopup';
import { connect } from 'react-redux';
import { getLocations } from '../../actions/locations';
import { getNotifications } from '../../actions/notifications';

const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
});

const mapDispatchToProps = dispatch => {
  return {
    getLocations: (startTime, endTime) => dispatch(getLocations(startTime, endTime)),
    getNotifications: () => dispatch(getNotifications()),
  }
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '70vh',
  },
  fixedHeight: {
    height: 240,
  },
  flexSection: {
    flexGrow: 1,
    display: 'flex',
    minHeight: 0,
  },

  flexColsScroll: {
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '70vh',
  },
  dateInput: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flex: 1,
    flexWrap: 'wrap'
  },

}));

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
              Your Website
      </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
  );
}

function Dashboard(props) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false); // For slide menu
  const [anchorNotification, setAnchotNotif] = React.useState(null); // Anchor for notification popper

  //Notification Popper control
  const openPopper = Boolean(anchorNotification);
  const id = openPopper ? 'simple-popper' : undefined;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNotification = (event) => {
    setAnchotNotif(anchorNotification ? null : event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchotNotif(null);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    // code to run on component mount
    props.getNotifications();
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {props.children.type.displayName.match(/\(([^)]+)\)/)[1]}
          </Typography>
          <ClickAwayListener onClickAway={handleCloseNotifications}>
            <div>
              <IconButton color="inherit" type="button" onClick={handleNotification}>
                <Badge badgeContent={props.notifications.filter((notification) => !notification.visualized).length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Popper id={id} open={openPopper} anchorEl={anchorNotification} style={{ zIndex: 10000, marginRight: "1vw", }} transition placement="bottom-start">
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={0}>
                    <NotificationsPopup notifications={props.notifications} handleClose={() => { handleCloseNotifications() }}/>
                  </Fade>
                )}
              </Popper>
            </div>
          </ClickAwayListener>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <ListItems />
      </Drawer>
      <main className={classes.content}>
        <Modal />
        <div className={classes.appBarSpacer} />
        {props.children}
        <Box pt={2}>
          <Copyright />
        </Box>
      </main>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);