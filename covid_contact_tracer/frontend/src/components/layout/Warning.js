import React from 'react';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import { red } from '@material-ui/core/colors';

export default function Warning(props){
    
    if (props.location["infected"]) {
        // If has a notification that was another user that created it
        if (props.location.notifications.filter((notification) => !notification.notifier).length > 0) {
    
          if (props.location["notified"]){ // Has both yellow and red alert
              return (
                <React.Fragment>
                  <Typography variant="subtitle2">
                    <WarningIcon style={{ color: red[500] }} />
                    It is possible that you come in contact with someone who has experienced COVID-19-like symptoms. We recommend that you scrupulously follow the instructions provided by the health authorities and check for COVID-19 symptons.
                  </Typography>
                  <br></br>
                  <Typography variant="subtitle2">
                    <WarningIcon style={{ color: 'FDB606' }} />
                    You notified this place as a possible COVID-19 infected. We recommend that you scrupulously follow the instructions provided by the health authorities.
                  </Typography>
                  <br></br>
                </React.Fragment>
              );
          } else { // just red alert
              return (
                <React.Fragment>
                  <Typography variant="subtitle2">
                    <WarningIcon style={{ color: red[500] }} />
                    It is possible that you come in contact with someone who has experienced COVID-19-like symptoms. We recommend that you scrupulously follow the instructions provided by the health authorities and check for COVID-19 symptons.
                  </Typography>
                  <br></br>
                </React.Fragment>
              );
          }
        }
        else { // You were the one that notified this place
          // Yellow alert
            return (
              <React.Fragment>
                <Typography variant="subtitle2">
                  <WarningIcon style={{ color: 'FDB606' }} />
                  You notified this place as a possible COVID-19 infected. We recommend that you scrupulously follow the instructions provided by the health authorities.
                </Typography>
                <br></br>
              </React.Fragment>
            );
          
        }
      }
}
  