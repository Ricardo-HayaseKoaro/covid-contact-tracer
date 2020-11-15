import { combineReducers } from 'redux';
import locations from './locations';
import errors from './errors';

export default combineReducers({
 locations,
 errors
});