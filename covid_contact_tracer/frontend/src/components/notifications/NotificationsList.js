import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Container from '@material-ui/core/Container';
import WarningIcon from '@material-ui/icons/Warning';
import { grey, red } from '@material-ui/core/colors';

import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import { visualizeNotification } from '../../actions/notifications';

const mapStateToProps = state => {
    return {
        notifications: state.notifications.notifications,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        visualizeNotification: (notification) => dispatch(visualizeNotification(notification)),
    }
}

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        cursor: "pointer",
        '&:hover': {
            backgroundColor: grey[200],
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '5vh',
        paddingBottom: theme.spacing(3),
    },
    table: {
        borderRadius: "10px",
        position: 'relative',
        overflow: 'auto',
        maxHeight: '75vh',
    },
    head: {
        backgroundColor: grey[300],
    },
}));

// Convert date format from DateTimeField format(python) to date (js)
const convertDate = data => {
    let d = new Date(data);
    return d.toLocaleString();
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView()    
    // run this function from an event handler or an effect to execute scroll 
 
    // Focus and open the notification clicked on the popper
    useEffect(() => {
        if (props.location) {
            if (props.location.search != "") {
                if (props.location.search.split('=')[1] == row.id) {
                    executeScroll();
                    props.visualize(row);
                }
            }
        }
    }, [props.location["search"]]);

    const handleOpen = () => {
        setOpen(!open);
        if (!row["visualized"]) {
            row["visualized"] = true;
            props.visualize(row);
        }
    }

    const background = open ? grey[100] : null;

    return (
        <React.Fragment>
            <TableRow ref={myRef} style={{ backgroundColor: background }} key={row.location.id} className={classes.root} onClick={() => handleOpen()}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => handleOpen()}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Box fontWeight={row["visualized"] ? "fontWeightRegular" : "fontWeightMedium"}>
                        {row.location["name"]}
                    </Box>
                </TableCell>
                <TableCell align="right">
                    <Box fontWeight={row["visualized"] ? "fontWeightRegular" : "fontWeightMedium"}>
                        {convertDate(row["created_at"])}
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Contact tracing details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Check-in time</TableCell>
                                        <TableCell>Check-out time</TableCell>
                                        <TableCell align="right">Map</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    <TableRow key={row.location.id}>
                                        <TableCell component="th">
                                            {convertDate(row.location["startTime"])}
                                        </TableCell>
                                        <TableCell>
                                            {convertDate(row.location["endTime"])}
                                        </TableCell>
                                        <TableCell align="right">See on GoogleMaps</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Box margin={2}>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                    <WarningIcon fontSize="small" style={{ color: red[500] }} />
                                    It is possible that you come in contact with someone who has experienced COVID-19-like symptoms. We recommend that you scrupulously follow the instructions provided by the health authorities and check for COVID-19 symptons.
                                </Typography>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function CollapsibleTable(props) {
    const classes = useStyles();

    // Get info from Link component of router
    const location = useLocation();

    return (
        <Container className={classes.root}>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="collapsible table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell />
                            <TableCell>Location name</TableCell>
                            <TableCell align="right">Notified at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.notifications.map((row) => (
                            <Row location={location} key={row.id} row={row} visualize={props.visualizeNotification} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
CollapsibleTable.displayName = "Contact Notifications";
export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleTable);