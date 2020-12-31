import axios from 'axios';

import { GET_LOCATIONS, UPLOADING, UPLOAD_SUCESS, UPLOAD_FAIL, LOADING_DATA, GET_DETAILS, LOADING_DETAILS, DELETE_LOCATION, CENTER_MAP, SHOW_MAP, SHOW_DIALOG} from './types';
import { createAlert  } from './alerts';
import { tokenConfig } from './auth';

// GET LOCATIONS
export const getLocations = (startTime, endTime) => (dispatch, getState) => {
  dispatch({ type: LOADING_DATA });
    axios
      .get('/api/locations/?start='+startTime+'&end='+endTime,  tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: GET_LOCATIONS,
          payload: res.data,
        });
        dispatch(createAlert({loadLocations: 'Locations Loaded'}, 'info'));
        dispatch(centerMap(res.data[0]))
      })
      .catch(err => dispatch
        (createAlert(err.response.data, 'error')));
};

// DELETE LOCATIONS
export const deleteLocation = (location_id) => (dispatch, getState) => {
    axios
      .delete('/api/locations/'+location_id+'/',  tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: DELETE_LOCATION,
          payload: location_id,
        });
      dispatch(createAlert({locationDeleted: 'Location Deleted'}, 'info'));
      })
      .catch(err => dispatch
        (createAlert(err.response.data, 'error')));
};

// UPLOAD LOCATIONS
export const uploadLocations = (body) => (dispatch, getState) => {
  dispatch({ type: UPLOADING });
  
  axios
    .post('/api/locations/', body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPLOAD_SUCESS,
        payload: res.data,
      });
      dispatch(createAlert({locationUploaded: 'Locations Upload Successfully'}, 'success'));

    })
    .catch((err) => {
      console.log(err);
      dispatch(createAlert(err.response.data, 'error'));
      dispatch({
        type: UPLOAD_FAIL,
      });
    });
};

// GET PLACE DETAILS
export const getDetails = (placeId) => (dispatch, getState) => {
  dispatch({ type: LOADING_DETAILS });

  axios.get('/api/locations/'+placeId+'/place_details/', tokenConfig(getState))
  .then((res) => {
    dispatch({
      type: GET_DETAILS,
      payload: res.data,
    });
  })
  .catch(err => dispatch
    (createAlert(err.response.data, 'error')));

};

// CENTER MAP 
export const centerMap = (local) => (dispatch) => {

  dispatch({ 
    type: CENTER_MAP,
    payload: local,
   });
};

// SHOW MAP 
export const showMap = (id) => (dispatch) => {

  dispatch({ 
    type: SHOW_MAP,
    payload: id,
   });
};

// SHOW DIALOG 
export const showDialog = (location, open) => (dispatch) => {
  dispatch({ 
    type: SHOW_DIALOG,
    payload: {location, open},
   });
};

