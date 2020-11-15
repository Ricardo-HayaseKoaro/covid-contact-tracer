import axios from 'axios';

import { GET_LOCATIONS, GET_ERRORS } from './types';
import { createMessage } from './messages';

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
      .catch(err => {
        const errors = {
          msg: err.response.data,
          status: err.response.status
        };
        dispatch({
          type: GET_ERRORS,
          payload: errors
        });
      });
  };
