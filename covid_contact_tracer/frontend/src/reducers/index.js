import { combineReducers } from 'redux';
import locations from './locations';
import errors from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
 locations,
 errors,
 messages,
 auth
});