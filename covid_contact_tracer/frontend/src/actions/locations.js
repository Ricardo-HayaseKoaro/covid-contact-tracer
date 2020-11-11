import axios from 'axios';

import { GET_LOCATIONS } from './types';

// GET LOCATIONS
export const get_locations = () => (dispatch) => {
    axios
      .get('/api/locations')
      .then((res) => {
        dispatch({
          type: GET_LOCATIONS,
          payload: res.data,
        });
      })
      .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
  };
