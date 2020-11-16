import axios from 'axios';

import { GET_LOCATIONS, GET_ERRORS } from './types';
import { createMessagem, returnErrors } from './messages';
import { tokenConfig } from './auth';

// GET LOCATIONS
export const getLocations = () => (dispatch, getState) => {
    axios
      .get('/api/locations',  tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: GET_LOCATIONS,
          payload: res.data,
        });
      })
      .catch(err => dispatch
        (returnErrors(err.response.data, err.response.status)));
  };
