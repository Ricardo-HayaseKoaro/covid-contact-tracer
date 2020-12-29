import { CREATE_ALERT } from '../actions/types';

const initialState = {
  msg: null,
  type: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ALERT:
      return {
        msg: action.payload.msg,
        type: action.payload.type,
      };
    default:
      return state;
  }
}