import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import TimelineLocations from './TimelineLocations';
import TimelinePlaceholder from './TimelinePlaceholder';
import SimpleMap from './LocationMaps';
import { connect } from 'react-redux';
import { getLocations, centerMap, showMap, getDetails, showDialog } from '../../actions/locations';


const mapStateToProps = (state) => ({
    auth: state.auth,
    locations: state.locations.locations,
    centerLocation: state.locations.centerLocation,
    showLocation: state.locations.showLocation,
    locationDialog: state.locations.locationDialog,
    dialogOpen: state.locations.dialogOpen,
});

const mapDispatchToProps = dispatch => {
    return {
        getLocations: (startTime, endTime) => dispatch(getLocations(startTime, endTime)),
        showMap: (id) => dispatch(showMap(id)),
        showDialog: (location, open) => dispatch(showDialog(location, open)),
        getDetails: (placeId) => dispatch(getDetails(placeId)),
        centerMap: (location) => dispatch(centerMap(location)),
    }
}

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: '65vh',
    },
    dateInput: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    switch: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        marginTop: '5px'
    },
    wrapper: {
        justifyContent: 'center',
    }
}));

function HomePage(props) {

    //Width control
    const timelineWidthMQ = useMediaQuery('(min-width:400px)');
    const dateInputMQ = useMediaQuery('(min-width:376px)');
    

    const classes = useStyles();
    const [heatmap, setHeatmap] = React.useState(false);
    const [startTime, setStart] = React.useState("2017-05-24T10:30");
    const date_aux = new Date();
    const [endTime, setEnd] = React.useState(date_aux.toISOString(Date.now()).slice(0, -8));

    const handleHeatMapSwitch = () => {
        setHeatmap(!heatmap);
    };

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3} className={classes.wrapper}>
                <Grid item xs={12} sm={6} style={{minWidth: timelineWidthMQ ? 'fit-content' : ''}} >
                    <Box className={classes.dateInput} style={{justifyContent: dateInputMQ ? 'space-between' : 'space-evenly'}}>
                        <TextField
                            id="datetime-local-start"
                            label="Start time"
                            type="datetime-local"
                            value={startTime}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={event => setStart(event.target.value)}
                        />
                        <TextField
                            id="datetime-local-end"
                            label="End time"
                            type="datetime-local"
                            defaultValue={endTime}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={event => setEnd(event.target.value)}
                        />
                        <Box marginTop="15px">
                            <Button variant="outlined" color="primary" onClick={() => props.getLocations(startTime, endTime)}>
                                Load
                            </Button>
                        </Box>
                    </Box>
                    <br />
                    <Paper className={classes.paper} >
                        { props.locations.length == 0 ? 
                            <TimelinePlaceholder onLoadClick={() => props.getLocations(startTime, endTime)} handleUploadOpen={props.handleUploadOpen} handleHelpOpen={props.handleHelpOpen}/> : 
                            <TimelineLocations className={classes.timeLine} {...props}/>
                        } 
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box className={classes.switch}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={heatmap}
                                    onChange={handleHeatMapSwitch}
                                    name="check_heatmap"
                                    color="primary"
                                />
                            }
                            label="View Heatmap"
                        />
                    </Box>
                    <br />
                    <Paper className={classes.paper} >
                        <SimpleMap heatmap={heatmap} {...props}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
HomePage.displayName = "Your Timeline";
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);