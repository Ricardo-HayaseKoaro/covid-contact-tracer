import React, { useState, useEffect } from 'react';
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
import { changePassword, updateUser, deleteUser } from '../../actions/auth';

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
        updateUser: (body) => dispatch(updateUser(body)),
        deleteUser: () => dispatch(deleteUser()),
        changePassword: (body) => dispatch(changePassword(body))
    }
}

function Account(props) {

    const classes = useStyles();

    const [username, setUsername] = useState(props.user.username);
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [old_password, setOldPassword] = useState();
    const [email, setEmail] = useState(props.user.email);
    const [first_name, setFirstName] = useState(props.user.first_name);
    const [last_name, setLastName] = useState(props.user.last_name);

    const onChangeUsername = e => {
        setUsername(e.target.value);
    }

    const onChangePassword = e => {
        setPassword(e.target.value);
    }

    const onChangePassword2 = e => {
        setPassword2(e.target.value);
    }

    const onChangeOldPassword = e => {
        setOldPassword(e.target.value);
    }

    const onChangeEmail = e => {
        setEmail(e.target.value);
    }

    const onChangeFirstName = e => {
        setFirstName(e.target.value);
    }

    const onChangeLastName = e => {
        setLastName(e.target.value);
    }


    //Validation for confirm password
    const [check_password, setCheckPassword] = useState();

    const validatePassword2 = () => {
        setCheckPassword(password2 ? password != password2 : false);
    }

    // Control for delete dialog
    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    }

    const handleCloseDialog = () => {
        setOpen(false);
    }


    const handleUpdate = (e) => {
        e.preventDefault();
        props.updateUser({username, email, first_name, last_name});
    }

    const handleDelete = (e) => {
        props.deleteUser(props.user);
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        props.changePassword({password, password2, old_password});
    }

    useEffect(() => {
        validatePassword2();
    });

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
                                value={username}
                                autoComplete="fname"
                                name="username"
                                variant="outlined"
                                required
                                id="username"
                                autoFocus
                                onChange={onChangeUsername}
                            />
                            <TextField
                                className={classes.input}
                                variant="outlined"
                                required
                                value={email}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={onChangeEmail}
                            />
                            <TextField
                                label="First Name"
                                className={classes.input}
                                value={first_name}
                                variant="outlined"
                                required
                                id="first_name"
                                name="first_name"
                                autoComplete="first_name"
                                onChange={onChangeFirstName}
                            />
                            <TextField
                                label="Last Name"
                                className={classes.input}
                                value={last_name}
                                variant="outlined"
                                required
                                id="last_name"
                                name="last_name"
                                autoComplete="last_name"
                                onChange={onChangeLastName}
                            />
                        </Box>
                        <Box className={classes.button}>
                            <Button variant="outlined" color="primary" size="medium" onClick={handleUpdate}>
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
                                variant="outlined"
                                required                                
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={onChangePassword}
                            />
                            <TextField
                                className={classes.input}
                                variant="outlined"
                                required
                                name="password2"
                                error={check_password}
                                helperText={check_password ? "Passwords needs to match."  : "" }
                                label="Confirm Password"
                                type="password"
                                id="password2"
                                onChange={onChangePassword2}
                            />
                            <TextField
                                className={classes.input}
                                label="Old Password"
                                variant="outlined"
                                required
                                name="oldPassword"
                                type="password"
                                id="oldPassword"
                                onChange={onChangeOldPassword}
                            />
                        </Box>
                        <Box className={classes.button}>
                            <Button variant="outlined" color="primary" size="medium" onClick={handleChangePassword}>
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
                <DeleteDialog open={open} handleDelete={handleDelete} handleClose={handleCloseDialog} />
            </Paper>
        </Container>
    );
}
Account.displayName = "Your Account";
export default connect(mapStateToProps, mapDispatchToProps)(Account)