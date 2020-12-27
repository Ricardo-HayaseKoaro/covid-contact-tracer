import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { red } from '@material-ui/core/colors';

import DeleteDialog from './DeleteDialog';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    sub: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    },
    input: {
        marginRight: '3vw',

    },
    inputFields: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexGrow: '1',
        minWidth: '40vw'
    },
    divider: {
        width: '100%',
        bottom: 0,
        marginTop: '3vh',
        marginBottom: '3vh'
    },
    button: {
        marginTop: '2vh',
    },
    delete: {
        color: theme.palette.getContrastText(red[700]),
        backgroundColor: red[700],
        '&:hover': {
          backgroundColor: red[900],
        },
    }
}));

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

function Account(props) {

    const classes = useStyles();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const handleDelete = () => {
    }

    const onChangeUsername = e => {
        setUsername(e.target.value);
    }

    const onChangePassword = e => {
        setPassword(e.target.value);
    }

    const onChangeEmail = e => {
        setEmail(e.target.value);
    }

    const [open, setOpen] = useState(false); // Control for delete dialog

    const handleOpenDialog = () => {
        setOpen(true);
    }

    const handleCloseDialog = () => {
        setOpen(false);
    }

    return (
        <Container maxWidth="lg" className={classes.root}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Typography component="h3" variant="h4">
                    Account Settings
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="h6">
                    Personal information
                </Typography>
                <form className={classes.form}>
                    <Box className={classes.sub}>
                        <Box className={classes.inputFields}>
                            <TextField
                                label="Username"
                                className={classes.input}
                                value={props.user.username}
                                autoComplete="fname"
                                name="username"
                                variant="outlined"
                                required
                                id="username"
                                autoFocus
                                onChange={onChangeUsername}
                            />
                            <TextField
                                label="Email Address"
                                className={classes.input}
                                value={props.user.email}
                                variant="outlined"
                                required
                                id="email"
                                name="email"
                                autoComplete="email"
                                onChange={onChangeEmail}
                            />
                        </Box>
                        <Box className={classes.button}>
                            <Button variant="outlined" color="primary" size="medium">
                                Update Your Info
                            </Button>
                        </Box>
                    </Box>
                </form>
                <br />
                <Divider className={classes.divider} />
                <Typography component="h1" variant="h6">
                    Password
                </Typography>
                <form className={classes.form}>
                    <Box className={classes.sub}>
                        <Box className={classes.inputFields}>
                            <TextField
                                className={classes.input}
                                label="Password"
                                variant="outlined"
                                required
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={onChangePassword}
                            />
                            <TextField
                                className={classes.input}
                                label="Confirm Password"
                                variant="outlined"
                                required
                                name="confirmPassword"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                onChange={onChangePassword}
                            />
                            <TextField
                                className={classes.input}
                                label="New Password"
                                variant="outlined"
                                required
                                name="newPassword"
                                type="password"
                                id="newPassword"
                                autoComplete="current-password"
                                onChange={onChangePassword}
                            />
                        </Box>
                        <Box className={classes.button}>
                            <Button variant="outlined" color="primary" size="medium">
                                Update Your Password
                            </Button>
                        </Box>
                    </Box>
                </form>
                <Divider className={classes.divider} />
                <Box marginBottom='2vh'>
                    <Button variant="outlined" color="primary" size="large" onClick={handleOpenDialog} className={classes.delete}>
                        Delete Your Account
                    </Button>
                </Box>
                <DeleteDialog open={open} handleDelete={handleDelete} handleClose={handleCloseDialog}/>
            </Paper>
        </Container>
    );
}
Account.displayName = "Your Account";
export default connect(mapStateToProps, mapDispatchToProps)(Account)