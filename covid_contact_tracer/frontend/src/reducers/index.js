import { combineReducers } from 'redux';
import locations from './locations';
import alerts from './alerts';
import auth from './auth';
import notifications from './notifications'

export default combineReducers({
 locations,
 auth,
 alerts,
 notifications, 
});