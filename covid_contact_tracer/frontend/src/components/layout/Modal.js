import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const mapStateToProps = state => {
    return {
        isUploading: state.locations.isUploading,
        isLoadindData: state.locations.isLoadindData,
    }
}


function SimpleModal(props) {
  const classes = useStyles();
 
  return (
    <div>
        <Modal open={props.isUploading || props.isLoadindData}>
            <Backdrop className={classes.backdrop} open={props.isUploading || props.isLoadindData}>
                <CircularProgress/>
            </Backdrop>        
      </Modal>
    </div>
  );
}

export default connect(mapStateToProps)(SimpleModal);