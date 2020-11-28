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

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 190,
  },
}));

function LocationDialog(props) {
    const classes = useStyles();
  
    return (
      <Dialog aria-labelledby="simple-dialog-title" open={props.open} onClose={props.onClose}>
         <LocationCard place={props.place_details.result} loading={props.isLoadingDetails}/>
      </Dialog>
    ) 
}
function LocationCard(props){
  const classes = useStyles();
  const { loading } = props;

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
            <Typography variant="body2" component="p">
              <b>Adress:</b> {props.place["formatted_address"]}
            </Typography>
            {props.place.hasOwnProperty('international_phone_number') &&
              <Typography variant="body2" component="p">
              <b>Phone number:</b> {props.place["international_phone_number"]}
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
          </React.Fragment>
        )}
      </CardContent>
      {loading ? (
        null
        ) : (
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    isLoadingDetails: state.locations.isLoadingDetails,
    place_details: state.locations.place_details
  }
}

export default connect(mapStateToProps)(LocationDialog);