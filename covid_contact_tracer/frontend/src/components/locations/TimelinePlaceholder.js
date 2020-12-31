import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import HelpIcon from '@material-ui/icons/Help';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }, 
    option: {
        marginTop: '5vh',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    help: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

export default function Placeholder(props) {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.option}>
                <Typography variant='h5' align='center'>
                    Load your location history
                </Typography>
                <br/>
                <Button variant="outlined" color="primary" onClick={props.onLoadClick}>
                    Load
                </Button>
                <br/>
                <Typography variant='h5' style={{color: grey[500]}}>
                  OR
                </Typography>
                <br/>
                <Typography variant='h5' align='center'>
                    Upload your location history
                </Typography>
                <br/>
                <IconButton onClick={props.handleUploadOpen}>
                    <CloudUploadIcon fontSize='large'/>
                </IconButton>
            </Box>
            <Box className={classes.help} fontSize='60px'>
                <Typography variant='subtitle1'>
                    For Help Click
                </Typography>
                <IconButton onClick={props.handleHelpOpen}>
                    <HelpIcon fontSize='small'/>
                </IconButton>
            </Box>
        </Box>
    );
}