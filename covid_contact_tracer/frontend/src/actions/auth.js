import axios from 'axios';
import { createAlert  } from './alerts';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_DELETE,
  USER_UPDATE,
  USER_CHANGE_PASSWORD,
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
    
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post('/api/auth/login', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch(createAlert(err.response.data, 'error'));
    });
};

// REGISTER USER
export const register = (user) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify(user);
  
  axios
    .post('/api/auth/register', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch(createAlert(err.response.data, 'error'));
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post('/api/auth/logout/', null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: 'CLEAR_LOCATIONS' });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      // dispatch(createAlert(err.response.data, 'error'));
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};

// UPDATE USER
export const updateUser = (user) => (dispatch, getState) => {

  // Request Body
  const body = JSON.stringify(user);
  
  axios
    .put('api/auth/update_account', body, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: USER_LOADING });
      dispatch({
        type: USER_UPDATE,
        payload: res.data,
      });
      dispatch(createAlert({accountUpdated: "Account information updated"}, "success"));
    })
    .catch((err) => {
      dispatch(createAlert(err.response.data, 'error'));
    });
};

// Change password
export const changePassword = (passwords) => (dispatch, getState) => {
 
  // Request Body
  const body = JSON.stringify(passwords);
  
  axios
    .put('/api/auth/change_password', body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_CHANGE_PASSWORD,
        payload: res.data,
      });
      dispatch(createAlert({passwordUpdated: "Password updated"}, "success"));
    })
    .catch((err) => {
      dispatch(createAlert(err.response.data, err.response.status));
    });
};

//DELETE USER
export const deleteUser = () => (dispatch, getState) => {

  axios
    .delete('/api/auth/delete', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_DELETE,
        payload: res.data,
      });
      dispatch(createAlert({userDeleted: "User deleted"}, "info"));
    })
    .catch((err) => {
      dispatch(createAlert(err.response.data, 'error'));
    });
};