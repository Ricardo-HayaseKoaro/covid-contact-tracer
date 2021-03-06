import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { red } from '@material-ui/core/colors';

import Warning from '../layout/Warning';
import NotificationConfirm from './NotificationConfirm';


import { connect } from 'react-redux';
import { deleteLocation } from '../../actions/locations';
import { notify } from '../../actions/notifications';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 190,
  },
  cardActions: {
    marginLeft: 7,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  notify: {
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    '&:hover': {
      backgroundColor: red[900],
    },
  }
}));

function LocationDialog(props) {
  const classes = useStyles();

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={props.open} onClose={props.onClose}>
      <LocationCard notify={props.notify} location={props.location} deleteLocation={props.deleteLocation} onClose={props.onClose} place={props.place_details.result} loading={props.isLoadingDetails} />
    </Dialog>
  )
}
function LocationCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false); // Notification confirmation control
  const { loading } = props;

  const handleDelete = (location_id) => {
    props.deleteLocation(location_id);
    props.onClose();
  }

  const handleNotify = () => {
    props.notify(props.location);
    props.location["infected"] = true;
    props.location["notified"] = true;
    props.onClose();
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCloseConfirmation = () => {
    setOpen(false);
  };

  const handleOpenConfirmation = () => {
    setOpen(true);
  };

  // Convert date format from DateTimeField format(python) to date (js)
  const convertDate = data => {
    let d = new Date(data);
    return d.toLocaleString();
  }

  const getGoogleLink = (placeId) => {
    const url = "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=" + placeId;
    return url;
  }

  return (
    <Card className={classes.card}>
      <NotificationConfirm open={open} handleClose={handleCloseConfirmation} handleNotify={handleNotify}/>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
          ) : (
              <Avatar aria-label="recipe" src={props.place["icon"]} />
            )
        }
        title={
          loading ? (
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
          ) : (
              props.place["name"]
            )
        }
      />
      {loading ? (
        <Skeleton animation="wave" width={345} variant="rect" className={classes.media} />
      ) : (
          null
        )}

      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
            <React.Fragment>
              {props.location["infected"] && <Warning location={props.location}/>}
              <Typography variant="body2">
                <b>Adress:</b> {props.place["formatted_address"]}
              </Typography>
              <Typography variant="body2">
                <b>From:</b> {convertDate(props.location["startTime"])}
              </Typography>
              <Typography variant="body2">
                <b>To:</b> {convertDate(props.location["endTime"])}
              </Typography>
              <Typography variant="body2">
                <b>Number of contacts:</b> {props.location["contacts"].length}
              </Typography>
              <Typography variant="body2">
                <b>Number of notifications:</b> {props.location["notifications"].length}
              </Typography>
            </React.Fragment>
          )}
      </CardContent>
      {loading ? (
        null
      ) : (
          <React.Fragment>
            <CardActions className={classes.cardActions} disableSpacing>
              {props.location["notified"] ?
                <Button variant="contained" size="medium" className={classes.notify} disabled>
                  Already notified
              </Button>
                :
                <Button variant="contained" size="medium" className={classes.notify} onClick={() => handleOpenConfirmation()}>
                  Notify
              </Button>
              }
              <IconButton aria-label="delete" color="primary" onClick={() => handleDelete(props.location["id"])}>
                <DeleteIcon />
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {props.place.hasOwnProperty('international_phone_number') &&
                  <Typography variant="body2">
                    <b>Phone number:</b> {props.place["international_phone_number"]}
                  </Typography>
                }
                {props.place.hasOwnProperty('website') &&
                  <Typography variant="body2">
                    <b>Website:</b> <a href={props.place["website"]} target="_blank">{props.place["website"]}</a>
                  </Typography>
                }
                {props.place.hasOwnProperty('opening_hours') &&
                  <Typography variant="body2">
                    <b>Opening hours:</b>
                  </Typography>
                }
                {props.place.hasOwnProperty('opening_hours') ? (
                  props.place["opening_hours"]["weekday_text"].map((day, index) => {
                    return (
                      <Typography variant="body2" key={index}>
                        {day}
                      </Typography>
                    )
                  })
                ) : (null)}
              </CardContent>
              <CardActions className={classes.cardActions} disableSpacing>
                <Button target="_blank" href={getGoogleLink(props.location["placeId"])} size="small" color="primary">
                  See on Google Maps
              </Button>
              </CardActions>
            </Collapse>
          </React.Fragment>
        )}
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    isLoadingDetails: state.locations.isLoadingDetails,
    place_details: state.locations.place_details,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteLocation: (location_id) => dispatch(deleteLocation(location_id)),
    notify: (location) => dispatch(notify(location)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationDialog);