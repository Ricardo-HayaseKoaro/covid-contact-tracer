import { GET_LOCATIONS, CLEAR_LOCATIONS } from '../actions/types.js';

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
            default:
                return state;
      }
  }