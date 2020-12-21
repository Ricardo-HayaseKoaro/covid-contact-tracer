import { combineReducers } from 'redux';
import locations from './locations';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import notifications from './notifications'

export default combineReducers({
 locations,
 errors,
 messages,
 auth,
 notifications, 
});