import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import Box from '@material-ui/core/Box';
import { red } from '@material-ui/core/colors';

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

  let warningText = "";
  if (props.place["notified"]) {
    warningText = "You notified this place as a possible COVID-19 infected. We recommend that you scrupulously follow the instructions provided by the health authorities.";
  }
  else if (props.place["infected"]) {
    warningText = "It is possible that you come in contact with someone who has experienced COVID-19-like symptoms. We recommend that you scrupulously follow the instructions provided by the health authorities and check for COVID-19 symptons.";
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Location Info
        </Typography>
        <Typography variant="body2">
          <Box fontWeight="fontWeightMedium">
            {props.place["name"]}
          </Box>
        </Typography>
        <br/>
        {props.place["infected"] &&
          <React.Fragment>
            <Typography variant="body2">
              <WarningIcon style={{ color: red[500] }} />
                Alert possible contact with COVID-19 infected
            </Typography>
          </React.Fragment>
        }
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => { props.openDialog(props.place) }}>Learn More</Button>
      </CardActions>
    </Card>
  );
}