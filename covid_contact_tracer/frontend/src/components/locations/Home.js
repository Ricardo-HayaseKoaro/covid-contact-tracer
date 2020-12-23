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

import TimelineLocations from './TimelineLocations';
import SimpleMap from './LocationMaps';
import { connect } from 'react-redux';
import { getLocations } from '../../actions/locations';

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = dispatch => {
    return {
        getLocations: (startTime, endTime) => dispatch(getLocations(startTime, endTime)),
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
        justifyContent: 'space-between',
        flex: 1,
        flexWrap: 'wrap'
    },
    switch: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flex: 1,
        flexWrap: 'wrap',
        marginTop: '5px'
    },
    timeLineWrapper: {
        minWidth: 'fit-content',
    },
    wrapper: {
        justifyContent: 'center',
    }
}));

function HomePage(props) {

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
                <Grid item xs={12} sm={6} className={classes.timeLineWrapper}>
                    <Box className={classes.dateInput}>
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
                        <Box maxWidth="fit-content">
                            <TimelineLocations className={classes.timeLine} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.timeLineWrapper}>
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
                        <SimpleMap heatmap={heatmap} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
HomePage.displayName = "Your Timeline";
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);