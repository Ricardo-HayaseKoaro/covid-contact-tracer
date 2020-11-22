import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({ children, ...props }) => (
    <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
        bootstrapURLKeys={{
            key: "AIzaSyBD7B_F6RSNSmY9A2glFg-QDUGxAF4lO3Q",
        }}
        {...props}
        >
        {children}
        </GoogleMapReact>
    </div>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;