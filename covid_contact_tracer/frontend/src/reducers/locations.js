import { GET_LOCATIONS, CLEAR_LOCATIONS, UPLOAD_SUCESS, UPLOAD_FAIL } from '../actions/types.js';

const initialState = {
    locations: []
  }

  export default function(state = initialState, action) {
      switch(action.type){
            case GET_LOCATIONS:
              return{
                ...state,
                locations: action.payload
              };
            case CLEAR_LOCATIONS:
              return {
                ...state,
                locations: [],
              };
            case UPLOAD_SUCESS:
              return {
                ...state,
                locations: action.payload,
              };
            case UPLOAD_FAIL:
              return state;
            default:
                return state;
      }
  }