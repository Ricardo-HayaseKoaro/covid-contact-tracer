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
import WarningIcon from '@material-ui/icons/Warning';
import { red } from '@material-ui/core/colors';

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
         <LocationCard notify={props.notify} location={props.location} deleteLocation={props.deleteLocation} onClose={props.onClose} place={props.place_details.result} loading={props.isLoadingDetails}/>
      </Dialog>
    ) 
}
function LocationCard(props){
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { loading } = props;

  const handleDelete = (location_id) => {
    props.deleteLocation(location_id);
    props.onClose();
  }

  const handleNotify = (location) => {
    props.notify(location);
    location["infected"] = true;
    location["notified"] = true;
    props.onClose();
  }

  // Convert date format from DateTimeField format(python) to date (js)
  const convertDate = data => {
    let d = new Date(data);
    return d.toLocaleString();
  }

  const getGoogleLink = (placeId) => {
    const url = "https://www.google.com/maps/search/?api=1&query=Google&query_place_id="+placeId;
    return url;
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let warningText = "";
  if (props.location["notified"]){
    warningText = "You notified this place as a possible COVID-19 infected. We recommend that you scrupulously follow the instructions provided by the health authorities.";
  }
  else if (props.location["infected"]) {
    warningText = "It is possible that you come in contact with someone who has experienced COVID-19-like symptoms. We recommend that you scrupulously follow the instructions provided by the health authorities and check for COVID-19 symptons.";
  }

  return (
    <Card className={classes.card}>
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
            {props.location["infected"] &&
              <React.Fragment>
                  <Typography variant="subtitle2" component="p">
                    <WarningIcon style={{ color: red[500] }}/>
                    {warningText}
                  </Typography>
                <br></br>
              </React.Fragment>
            }
            <Typography variant="body2" component="p">
              <b>Adress:</b> {props.place["formatted_address"]}
            </Typography>
            <Typography variant="body2" component="p">
              <b>From:</b> {convertDate(props.location["startTime"])}
            </Typography>
            <Typography variant="body2" component="p">
              <b>To:</b> {convertDate(props.location["endTime"])}
            </Typography>
            <Typography variant="body2" component="p">
              <b>Number of contacts:</b> {props.location["contacts"].length}
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
              <Button variant="contained" size="medium" className={classes.notify} onClick={() => handleNotify(props.location)}>
                Notify
              </Button>
            }
            <IconButton aria-label="delete" color="primary" onClick={() => handleDelete(props.location["id"])}>
              <DeleteIcon/>
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
                <Typography variant="body2" component="p">
                <b>Phone number:</b> {props.place["international_phone_number"]}
                </Typography>
              }
              {props.place.hasOwnProperty('website') &&
                <Typography variant="body2" component="p">
                <b>Website:</b> <a href={props.place["website"]} target="_blank">{props.place["website"]}</a>
                </Typography>
              }
              {props.place.hasOwnProperty('opening_hours') &&
                <Typography variant="body2" component="p">
                  <b>Opening hours:</b>
                </Typography>
              }
              {props.place.hasOwnProperty('opening_hours') ? (
                props.place["opening_hours"]["weekday_text"].map((day, index) => {
                  return (
                    <Typography variant="body2" component="p" key={index}>
                      {day}
                    </Typography>
                  )
                })
              ) : ( null )}
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