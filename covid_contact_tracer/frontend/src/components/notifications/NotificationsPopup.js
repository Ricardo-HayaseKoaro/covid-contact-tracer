import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: grey[300],
        cursor: "pointer",
        '&:hover': {
            backgroundColor: grey[200],
          },
    },
    inline: {
        display: 'inline',
    },
}));

export default function notifications(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {props.notifications.map((notification) => {
                return (
                    <React.Fragment>
                        <ListItem alignItems="flex-start" key={notification["id"]}>
                            <ListItemText
                                primary="Contact Alert"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                        {notification.location["name"]}
                            </Typography>
                                        {" - You were potentially exposed to an infected person"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider component="li" />
                    </React.Fragment>
                )
            })}
        </List>
    );
}