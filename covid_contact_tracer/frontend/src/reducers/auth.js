import { returnErrors } from '../actions/messages.js';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS } from '../actions/types.js';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
        return {
            ...state,
            isLoading: true
        }
    case USER_LOADED:
        return {
            ...state,
            isLoading: false,
            isAuthenticated: true,
            user: action.payload
        }
    case AUTH_ERROR:
    case LOGIN_FAIL:
        localStorage.removeItem("token");
        return {
            ...state,
            isLoading: false,
            isAuthenticated: false,
            user: null,
            token: null
        }
    case LOGIN_SUCCESS:
        localStorage.setItem("token", action.payload.token);
        return{
            ...state,
            ...action.payload,
            isLoading: false,
            isAuthenticated: true
        }
    default:
      return state;
  }
}