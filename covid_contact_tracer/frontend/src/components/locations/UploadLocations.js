import React, { Component } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'

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
    }

    // Read all file and send array of files to backend
    handleSave(files) {
        this.props.handleClose();
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
            results.forEach(function (item) {
                const timelineObjects = JSON.parse(item['result']);
                objs = objs.concat(timelineObjects["timelineObjects"]);
            });
            const request_data = { "timelineObjects": objs };
            _this.props.uploadLocations((request_data));
            _this.setState({
                open: false,
            });
        });
    }

    render() {
        return (
            <DropzoneDialog
                open={this.props.openUpload}
                onSave={this.handleSave.bind(this)}
                acceptedFiles={['application/json']}
                useChipsForPreview
                filesLimit={1}
                onClose={this.props.handleClose}
                dropzoneText={"Drag and drop your location history here or click"}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadLocationsDialog);