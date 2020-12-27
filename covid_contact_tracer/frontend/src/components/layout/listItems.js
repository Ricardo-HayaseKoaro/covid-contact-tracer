import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BarChartIcon from '@material-ui/icons/BarChart';
import Divider from '@material-ui/core/Divider';

import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

function listItems(props) {
  return (
    <List>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Your Timeline" />
      </ListItem>
      <ListItem button component={Link} to="/notifications">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/account">
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Your Account" />
      </ListItem>
      <ListItem button component={Link} to="/login" onClick={props.logout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
}

export default connect(mapStateToProps, { logout })(listItems);