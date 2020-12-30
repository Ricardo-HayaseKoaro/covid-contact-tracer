import React from 'react';
import GoogleMap from '../maps/GoogleMaps';
import {isEmpty} from "lodash"
import LocationCardMap from "./LocationCardMap"
import PlaceIcon from '@material-ui/icons/Place';
import WarningIcon from '@material-ui/icons/Warning';

import DEFAULT_CENTER from './defaultCenter';

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
      <LocationCardMap location={props.place} openDialog={props.openDialog} closeDialog={props.closeDialog}></LocationCardMap>
    </div>
  );
};

// Marker component
const Marker = (props) => {

  let zIndexControl = 1;
  let iconColor = "#3f51b5";
  if (props.place["infected"]) {
    // If has a notification that was another user that created it
    if (props.place.notifications.filter((notification) => !notification.notifier).length > 0){
      // Red alert
      iconColor = "E30808";
    }
    else { // You were the one that notified this place
      // Yellow alert
      iconColor = "FDB606";
    }
    zIndexControl = 50;
  }
  const markerStyle = {
    height: 20,
    width: 20,
    color: iconColor,
    cursor: 'pointer',
    position: 'relative',
    zIndex: zIndexControl,
  };

  if (props.place["infected"]) {
    return (
      <>
        <WarningIcon style={markerStyle} />
        {props.show==props.place["id"] && <InfoWindow place={props.place} openDialog={props.openDialog} closeDialog={props.closeDialog}/>}
      </>
    );
  } else {
    return (
      <>
        <PlaceIcon style={markerStyle} />
        {props.show==props.place["id"] && <InfoWindow place={props.place} openDialog={props.openDialog} closeDialog={props.closeDialog}/>}
      </>
    );
  }
  
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
          defaultZoom={7}
          defaultCenter={DEFAULT_CENTER}
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

export default MarkerInfoWindow;

