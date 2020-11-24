import React, { Component } from 'react';
import { connect } from 'react-redux';
// examples:
import GoogleMap from '../maps/GoogleMaps';

import LOS_ANGELES_CENTER from './la_center';

//Redux mapping
const mapStateToProps = state => {
  return {
    locations: state.locations.locations
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
      {/* <div style={{ fontSize: 14 }}>
        <span style={{ color: 'grey' }}>
          {place.rating}
          {' '}
        </span>
        <span style={{ color: 'orange' }}>
          {String.fromCharCode(9733).repeat(Math.floor(place.rating))}
        </span>
        <span style={{ color: 'lightgrey' }}>
          {String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}
        </span>
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
        {place.types[0]}
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
        {'$'.repeat(place.price_level)}
      </div>
      <div style={{ fontSize: 14, color: 'green' }}>
        {place.opening_hours.open_now ? 'Open' : 'Closed'}
      </div> */}
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
    backgroundColor: show ? 'red' : 'blue',
    cursor: 'pointer',
    zIndex: 10,
  };

  return (
    <>
      <div style={markerStyle} />
      {show && <InfoWindow place={place} />}
    </>
  );
};

class MarkerInfoWindow extends Component{
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.locations !== this.props.locations) {
      this.props.locations.forEach((place) => {
        place.show = false;
      });
      this.setState({
        places: this.props.locations,
      });
    }
  }

  // onChildClick callback can take two arguments: key and childProps
  onChildClickCallback = (key) => {
    this.setState((state) => {
      const index = state.places.findIndex((e) => e.id === key);
      state.places[index].show = !state.places[index].show;
      return { places: state.places };
    });
  };

  render(){

    const { places } = this.state;

    return (
      <>
        {(
          <GoogleMap
            defaultZoom={5}
            defaultCenter={LOS_ANGELES_CENTER}
            // onChildClick={this.onChildClickCallback}
          >
            {places.map((place) => {
              return ( 
              <Marker
                key = {place.id}
                lat = {place.latitude}
                lng = {place.longitude}
                show = {place.show}
                place={place}
              />)
            })}
          </GoogleMap>
        )}
      </>
    );

  }
}

export default connect(mapStateToProps)(MarkerInfoWindow);