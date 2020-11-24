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
import LocationDialog from './LocationDialog';
import Link from '@material-ui/core/Link';

import { connect } from 'react-redux';


// Convert date format from DateTimeField format(python) to date (js)
const convertDate = data => {
  let d = new Date(data);
  return d.toLocaleString();
}

const mapStateToProps = state => {
  return {
    locations: state.locations.locations
  }
}

function TimelineLocations(props) {
  const [open, setOpen] = React.useState(false);
  const [local, setLocal] = React.useState(null);

  const handleClickOpen = (local) => {
    setOpen(true);
    setLocal(local);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Timeline >
      {props.locations.map((local) => {
        return (
          <TimelineItem key={local["id"]}>
            <TimelineOppositeContent>
              <Typography>
                  <Link
                      component="button"
                      onClick={() => handleClickOpen(local)}
                      color="inherit"
                      align="right"
                      variant="inherit"
                  >                
                    {local["name"]}
                  </Link>
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                <PlaceIcon style={{ fontSize: 20 }}/>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography color="textSecondary">
                <Link
                    component="button"
                    onClick={() => handleClickOpen(local)}
                    color="inherit"    
                    variant="inherit"
                    >                
                    {convertDate(local["startTime"])}
                  </Link>
              </Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
      <LocationDialog location={local} open={open} onClose={handleClose}/>
    </Timeline>
  );
}

export default connect(mapStateToProps)(TimelineLocations);