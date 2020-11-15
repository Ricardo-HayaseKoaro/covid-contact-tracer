import axios from 'axios';

import { GET_LOCATIONS, GET_ERRORS } from './types';
import { createMessagem, returnErrors } from './messages';

// GET LOCATIONS
export const getLocations = () => (dispatch) => {
    axios
      .get('/api/locations')
      .then((res) => {
        dispatch({
          type: GET_LOCATIONS,
          payload: res.data,
        });
      })
      .catch(err => dispatch
        (returnErrors(err.response.data, err.response.status)));
  };
