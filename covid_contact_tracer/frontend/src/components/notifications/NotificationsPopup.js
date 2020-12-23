import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: grey[300],
        borderRadius: "10px",
        position: 'relative',
        overflow: 'auto',
        maxHeight: '90vh',
    },
    inline: {
        display: 'inline',
    },
    notification: {
        borderRadius: "10px",
        cursor: "pointer",
        '&:hover': {
            backgroundColor: grey[200],
        },
    }
}));

export default function notifications(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {props.notifications.filter((notification) => !notification.visualized).map((notification) => {
                return (
                    <React.Fragment key={notification["id"]}>
                            <ListItem  alignItems="flex-start" onClick={() => notification["visualized"]=true} button component={Link} to={{ pathname: "/notifications", search: "?id="+notification["id"] }}  className={classes.notification}>
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