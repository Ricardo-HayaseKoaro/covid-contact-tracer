import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts(props) {
  const classes = useStyles();

  const { style, options, message, close } = props;

  return (
    <div className={classes.root}>
      <Alert variant="filled" severity={options.type} >{message}</Alert>
    </div>
  );
}