import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';

import {
  NOTIFY,
  NOTIFY_FAIL,
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATIONS,
  NOTIFYING,
} from './types';

// CREATE NOTIFICATION
// Receive the id of all user in the cluster
export const notify = (location) => (dispatch, getState) => {

    dispatch({ type: NOTIFYING });

    // Headers
    const config = {
    headers: {
        'Content-Type': 'application/json',
    },
    };


    // Request Body
    const body = JSON.stringify({ location });

    axios
    .post('/api/notifications/', body, tokenConfig(getState))
    .then((res) => {
        dispatch({
        type: NOTIFY,
        payload: res.data,
        });
    })
    .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
        type: NOTIFY_FAIL,
        });
    });
};

// GET NOTIFICATIONS
export const getNotifications = () => (dispatch, getState) => {
    axios
    .get('/api/notifications/', tokenConfig(getState))
    .then((res) => {
        dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data,
        });
    })
    .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
        type: NOTIFICATION_FAIL,
        });
    });
};

// DELETE NOTIFICATIONS
export const deleteNotifications = (id) => (dispatch, getState) => {

    axios
    .delete('/api/notifications/'+id+'/', tokenConfig(getState))
    .then((res) => {
        dispatch({
        type: DELETE_NOTIFICATIONS,
        payload: res.data,
        });
    })
    .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
        type: NOTIFICATION_FAIL,
        });
    });
};
