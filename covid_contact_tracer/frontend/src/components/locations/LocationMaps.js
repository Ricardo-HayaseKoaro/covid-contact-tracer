import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import GoogleMap from '../maps/GoogleMaps';
import {isEmpty} from "lodash"

import { showMap } from '../../actions/locations';

import LOS_ANGELES_CENTER from './la_center';

//Redux mapping
const mapStateToProps = state => {
  return {
    locations: state.locations.locations,
    centerLocation: state.locations.centerLocation,
    showLocation: state.locations.showLocation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showMap: (id) => dispatch(showMap(id)),
  }
}

// InfoWindow component
const InfoWindow = (props) => {
  const { place } = props;
  const infoWindowStyle = {
    position: 'relative',
    bottom: 150,
    left: '-45px',
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>
        {place.name}
      </div>
    </div>
  );
};

// Marker component
const Marker = ({ show, place }) => {
  const markerStyle = {
    border: '1px solid white',
    borderRadius: '50%',
    height: 10,
    width: 10,
    backgroundColor: show==place.id ? 'red' : 'blue',
    cursor: 'pointer',
    position: 'relative',
    zIndex: show==place.id ? 1000 : 1,
  };

  return (
    <>
      <div style={markerStyle} />
      {show==place.id && <InfoWindow place={place} />}
    </>
  );
};

function MarkerInfoWindow(props) { 

  const onChildClickCallback = (key) => {
    props.showMap(key);
  };

  const onCloseChild = () => {
    props.showMap(null);
  }

  useEffect(() => {
    props.showMap(props.centerLocation["id"]);
  });

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
      />)
    })
  }
  else {
    markers = [];
  }

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
          center={center_location}
        >
          {markers}
        </GoogleMap>
      )}
    </>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(MarkerInfoWindow);

