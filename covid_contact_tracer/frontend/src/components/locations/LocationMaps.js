import React, { useState } from 'react';
import { connect } from 'react-redux';
import GoogleMap from '../maps/GoogleMaps';
import {isEmpty} from "lodash"
import LocationCardMap from "./LocationCardMap"

import { showMap, getDetails, showDialog } from '../../actions/locations';

import LOS_ANGELES_CENTER from './la_center';

//Redux mapping
const mapStateToProps = state => {
  return {
    locations: state.locations.locations,
    centerLocation: state.locations.centerLocation,
    showLocation: state.locations.showLocation,
    locationDialog: state.locations.locationDialog,
    dialogOpen: state.locations.dialogOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showMap: (id) => dispatch(showMap(id)),
    showDialog: (location, open) => dispatch(showDialog(location, open)),
    getDetails: (placeId) => dispatch(getDetails(placeId))
  }
}

// InfoWindow component
const InfoWindow = (props) => {
  const infoWindowStyle = {
    position: 'relative',
    bottom: 150,
    left: '-45px',
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    fontSize: 14,
    zIndex: 100,
  };

  return (
    <div style={infoWindowStyle}>
      <LocationCardMap place={props.place} openDialog={props.openDialog} closeDialog={props.closeDialog}></LocationCardMap>
    </div>
  );
};

// Marker component
const Marker = (props) => {
  const markerStyle = {
    border: '1px solid white',
    borderRadius: '50%',
    height: 10,
    width: 10,
    backgroundColor: props.show==props.place["id"] ? 'red' : 'blue',
    cursor: 'pointer',
    position: 'relative',
    zIndex: props.show==props.place["id"] ? 1000 : 1,
  };

  return (
    <>
      <div style={markerStyle} />
      {props.show==props.place["id"] && <InfoWindow place={props.place} openDialog={props.openDialog} closeDialog={props.closeDialog}/>}
    </>
  );
};

function MarkerInfoWindow(props) { 

  // Open dialog
  const handleOpenDialog = (location) => {
    props.getDetails(location["placeId"]); // Place id - used by google
    props.showDialog(location, true);    
  };
  
  //Close dialog
  const handleCloseDialog = () => {
    props.showDialog(props.locationDialog, false); // close dialog
  };

  // Show card on map
  const onChildClickCallback = (key) => {
    props.showMap(key);
  };

  //Close card on map
  const onCloseChild = () => {
    props.showMap(null);
  }

  // Mapping markers
  let markers;
  if (!isEmpty(props.locations)) {
    markers = props.locations.map((place) => {
      return ( 
      <Marker
        key = {place.id}
        lat = {place.latitude}
        lng = {place.longitude}
        show = {props.showLocation}
        place={place}
        openDialog={handleOpenDialog}
        closeDialog={handleCloseDialog}
      />)
    })
  }
  else {
    markers = [];
  }

  //Mapping heatmap
  let data;
  if (props.heatmap){
    data = props.locations.map((place) => ({
      lat: place.latitude,
      lng: place.longitude,
    }));
  }else{
    data = [];
  }
  
  const heatmapData = {
    positions: data,
    options: {
      radius: 20,
      opacity: 1,
    },
  };
  
  // Centering map when click in Place icon in Timeline
  let center_location;
  if (!isEmpty(props.centerLocation)){
    center_location = [parseFloat(props.centerLocation["latitude"]), parseFloat(props.centerLocation["longitude"])];
  }
  else {
    center_location = null;
  }

  return (
    <>
      {(
        <GoogleMap
          defaultZoom={13}
          defaultCenter={LOS_ANGELES_CENTER}
          onChildClick={onChildClickCallback}
          onClick={onCloseChild}
          heatmap={heatmapData}
          center={center_location}
        >
          {props.heatmap ? [] : markers}
        </GoogleMap>
      )}
    </>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(MarkerInfoWindow);

