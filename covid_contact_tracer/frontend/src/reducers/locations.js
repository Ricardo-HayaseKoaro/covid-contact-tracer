import { GET_LOCATIONS, CLEAR_LOCATIONS, UPLOAD_SUCESS, UPLOAD_FAIL, UPLOADING, LOADING_DATA, GET_DETAILS, LOADING_DETAILS } from '../actions/types.js';

const initialState = {
    locations: [],
    isUploading: false,
    isLoadingData: false,
    isLoadingDetails: false,
    place_details: {},
  }

  export default function(state = initialState, action) {
      switch(action.type){
            case GET_LOCATIONS:
              return{
                ...state,
                locations: action.payload,
                isLoadingData: false,
              };
            case CLEAR_LOCATIONS:
              return {
                ...state,
                locations: [],
              };
            case UPLOAD_SUCESS:
              return {
                ...state,
                locations: state.locations.concat(action.payload),
                isUploading: false,
              };
            case UPLOAD_FAIL:
              return state;
            case UPLOADING:
              return {
                ...state,
                isUploading: true,
              };
            case LOADING_DATA:
              return {
                ...state,
                isLoadingData: true,
              };
            case GET_DETAILS:
              return {
                ...state,
                place_details: action.payload,
                isLoadingDetails: false,
              };
            case LOADING_DETAILS:
              return {
                ...state,
                isLoadingDetails: true,
              };
            default:
                return state;
      }
  }