import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    }, 
    text: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    }
}));

export default function notifications(props) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography variant='h5' className={classes.text}>
                Upload your location history
            </Typography>
            <IconButton>
                <CloudUploadIcon fontSize='large'/>
            </IconButton>
        </Box>
    );
}