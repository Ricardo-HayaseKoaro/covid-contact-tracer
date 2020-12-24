import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Warning from '../layout/Warning';

const useStyles = makeStyles({
  root: {
    zIndex: 100,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function LocationCardMap(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Location Info
        </Typography>
        <Typography variant="body2">
          <Box fontWeight="fontWeightMedium">
            {props.location["name"]}
          </Box>
        </Typography>
        <br/>
        {props.location["infected"] && <Warning location={props.location}/>}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => { props.openDialog(props.location) }}>Learn More</Button>
      </CardActions>
    </Card>
  );
}