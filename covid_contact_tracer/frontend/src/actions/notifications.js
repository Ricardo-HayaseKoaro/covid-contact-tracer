import axios from 'axios';
import { createAlert } from './alerts';
import { tokenConfig } from './auth';

import {
  NOTIFY,
  NOTIFY_FAIL,
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATIONS,
  NOTIFYING,
  NOTIFICATION_FAIL,
  VISUALIZE_NOTIFICATION,
} from './types';

// CREATE NOTIFICATION
// Receive the id of all user in the cluster
export const notify = (location) => (dispatch, getState) => {

    dispatch({ type: NOTIFYING });

    // Request Body
    const body = JSON.stringify(location);
    axios
    .post('/api/notifications/', body, tokenConfig(getState))
    .then((res) => {
        dispatch({
        type: NOTIFY,
        payload: res.data,
        });
        dispatch(createAlert({notified: 'System Notified'}, 'success'));
    })
    .catch((err) => {
        dispatch({
        type: NOTIFY_FAIL,
        });
        dispatch(createAlert(err.response.data, 'error'));
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
        dispatch({
        type: NOTIFICATION_FAIL,
        });
        dispatch(createAlert(err.response.data, 'error'));
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
        dispatch(createAlert({notificationDeleted: 'Notification deleted'}, 'info'));
    })
    .catch((err) => {
        dispatch(createAlert(err.response.data, 'error'));
        dispatch({
        type: NOTIFICATION_FAIL,
        });
    });
};

// VISUALIZE NOTIFICATION
export const visualizeNotification = (notification) => (dispatch, getState) => {

    const body = JSON.stringify({ visualized: notification.visualized });

    axios
    .patch('/api/notifications/'+notification["id"]+'/', body, tokenConfig(getState))
    .then((res) => {
        dispatch({
        type: VISUALIZE_NOTIFICATION,
        payload: res.data,
        });
    })
    .catch((err) => {
        dispatch(createAlert(err.response.data, 'error'));
        dispatch({
        type: NOTIFICATION_FAIL,
        });
    });
};
