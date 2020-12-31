import React, { Component } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'

import { connect } from 'react-redux';
import { uploadLocations } from '../../actions/locations';
import { createAlert } from '../../actions/alerts';


const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        uploadLocations: (files) => dispatch(uploadLocations(files)),
        createAlert: (msg, type) => dispatch(createAlert(msg, type)),
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
            try {
                var objs = [];
                results.forEach(function (item) {
                    const timelineObjects = JSON.parse(item['result']);
                    objs = objs.concat(timelineObjects["timelineObjects"]);
                });
                objs = objs.filter((location) => Object.keys(location) == "placeVisit");
                let locations = [];
                objs.forEach((obj) => {
                    let location = {};
                    location["name"] = obj.placeVisit["location"]["name"];
                    location["placeId"] = obj.placeVisit["location"]["placeId"];
                    location["latitude"] = obj.placeVisit["location"]["latitudeE7"]/10000000;
                    location["longitude"] = obj.placeVisit["location"]["longitudeE7"]/10000000;
                    location["startTime"] = new Date(obj.placeVisit["duration"]["startTimestampMs"]/1).toISOString();
                    location["endTime"] = new Date(obj.placeVisit["duration"]["endTimestampMs"]/1).toISOString();
                    location["notified"] = false;
                    location["infected"] = false;
                    locations.push(location);
                });
                _this.props.uploadLocations((locations));
                _this.setState({
                    open: false,
                });
            } catch (e) {
                _this.props.createAlert({uploadFail: "Invalid File"}, "error")
            }
        })
    }

    render() {
        return (
            <DropzoneDialog
                open={this.props.openUpload}
                onSave={this.handleSave.bind(this)}
                acceptedFiles={['application/json']}
                useChipsForPreview
                filesLimit={3}
                onClose={this.props.handleClose}
                dropzoneText={"Drag and drop your location history here or click"}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadLocationsDialog);