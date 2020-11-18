import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { connect } from 'react-redux';
import { uploadLocations } from '../../actions/locations';

const mapStateToProps = state => {
    return {}
  }
  
const mapDispatchToProps = dispatch => {
    return {
        uploadLocations: (files) => dispatch(uploadLocations(files))
    }
}

class UploadLocationsDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    // Read all file and send array of files to backend
    handleSave(files) {
        const _this = this;
        return Promise.all([].map.call(files, function (file) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    resolve({ result: reader.result, file: file });
                };
                reader.readAsText(file);
            });
        })).then(function (results) {
            var objs = [];
            results.forEach(function(item){
                const timelineObjects = JSON.parse(item['result']);
                objs = objs.concat(timelineObjects["timelineObjects"]);
            });
            const request_data = {"timelineObjects": objs};
            _this.props.uploadLocations((request_data));
            _this.setState({
                open: false,
            });
        });
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <div>
                <ListItem button onClick={this.handleOpen.bind(this)}>
                    <ListItemIcon>
                        <CloudUploadIcon />
                    </ListItemIcon>
                    <ListItemText primary="Upload Locations" />
                </ListItem>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['application/json']}
                    useChipsForPreview
                    onClose={this.handleClose.bind(this)}
                    dropzoneText={"Drag and drop your location history here or click"}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadLocationsDialog);