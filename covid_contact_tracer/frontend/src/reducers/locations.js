import { GET_LOCATIONS, CLEAR_LOCATIONS, UPLOAD_SUCESS, UPLOAD_FAIL, UPLOADING, LOADING_DATA, GET_DETAILS, LOADING_DETAILS, DELETE_LOCATION, CENTER_MAP, SHOW_MAP, SHOW_DIALOG } from '../actions/types.js';

const initialState = {
    locations: [],
    isUploading: false,
    isLoadingData: false,
    isLoadingDetails: false,
    place_details: {},
    centerLocation: {},
    showLocation: null,
    locationDialog: null,
    dialogOpen: false
  }

export default function(state = initialState, action) {
    switch(action.type){
          case GET_LOCATIONS:
            return{
              ...state,
              locations: action.payload,
              isLoadingData: false,
            };
          case DELETE_LOCATION:
            return{
              ...state,
              locations: state.locations.filter((location) => location.id !== action.payload),
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
              isUploading: false,
            };
          case UPLOAD_FAIL:
            return {
              ...state,
              isUploading: false,
            };
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
          case CENTER_MAP:
            return {
              ...state,
              centerLocation: action.payload,
            };
          case SHOW_MAP:
            return {
              ...state,
              showLocation: action.payload,
            };
          case SHOW_DIALOG:
            return {
              ...state,
              locationDialog: action.payload.location,
              dialogOpen: action.payload.open
            };
          default:
              return state;
    }
}