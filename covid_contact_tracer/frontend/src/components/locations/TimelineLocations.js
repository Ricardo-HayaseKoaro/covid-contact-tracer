import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import PlaceIcon from '@material-ui/icons/Place';
import WarningIcon from '@material-ui/icons/Warning';
import LocationDialog from './LocationDialog';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';


// Convert date format from DateTimeField format(python) to date (js)
const convertDate = data => {
  let d = new Date(data);
  return d.toLocaleString();
}

function TimelineLocations(props) {

  // Open dialog
  const handleClickOpen = (location) => {
    props.getDetails(location["placeId"]); // Place id - used by google
    props.showDialog(location, true);
  };

  // Center map and open location card in map
  const handleClickIcon = (location) => {
    props.centerMap(location); // center map in location
    props.showMap(location["id"]); // open card 
  };


  const handleClose = () => {
    props.showDialog(props.locationDialog, false); // close dialog
  };


  return (
    <Box maxWidth="fit-content">
      <Timeline >
        {props.locations.map((location) => {
          let iconColor;
          let txtColor;
          if (location["infected"]) {
            // If has a notification that was another user that created it
            if (location.notifications.filter((notification) => !notification.notifier).length > 0) {
              // Red alert
              iconColor = "E30808";
              txtColor = "error";
            }
            else { // You were the one that notified this place
              // Yellow alert
              iconColor = "FDB606";
              txtColor = "inherit";
            }
          }
          else { // No notifications
            txtColor = "inherit";
            iconColor = "#3f51b5";
          }

          return (
            <TimelineItem key={location["id"]}>
              <TimelineOppositeContent>
                <Typography>
                  <Link
                    component="button"
                    onClick={() => handleClickOpen(location)}
                    color={txtColor}
                    align="right"
                    variant="inherit"
                  >
                    <Box fontWeight="fontWeightMedium">
                      {location["name"]}
                    </Box>
                  </Link>
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <IconButton onClick={() => handleClickIcon(location)} size="small">
                  <TimelineDot>
                    {location.infected ?
                      <WarningIcon style={{ fontSize: 20, color: iconColor }} /> :
                      <PlaceIcon style={{ fontSize: 20, color: iconColor }} />
                    }
                  </TimelineDot>
                </IconButton>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography color="textSecondary">
                  <Link
                    component="button"
                    onClick={() => handleClickOpen(location)}
                    color="inherit"
                    variant="inherit"
                  >
                    {convertDate(location["startTime"])}
                    {location["notified"] &&
                      <Typography color="textSecondary">
                        You notified this place
                    </Typography>
                    }
                  </Link>
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
        <LocationDialog location={props.locationDialog} open={props.dialogOpen} onClose={handleClose} />
      </Timeline>
    </Box>
  );
}


export default TimelineLocations;