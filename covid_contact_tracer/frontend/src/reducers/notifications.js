import { NOTIFY, NOTIFY_FAIL, GET_NOTIFICATIONS, DELETE_NOTIFICATIONS, NOTIFYING, NOTIFICATION_FAIL, VISUALIZE_NOTIFICATION } from '../actions/types';

const initialState = {
  notifications: [],
  isNotifying: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NOTIFY:
      return {
        ...state,
        notifications: state.notifications.append(action.payload),
        isNotifying: false,
      }
    case NOTIFY_FAIL:
      return state
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      }
    case DELETE_NOTIFICATIONS:
      return {
        ...state,
        notifications: state.notifications.filter((notification) => notification.id !== action.payload),
      };
    case NOTIFYING:
      return {
        ...state,
        isNotifying: true
      }
    case NOTIFICATION_FAIL:
      return {
        ...state, 
      }
    case VISUALIZE_NOTIFICATION:
      return {
        ...state,
      }
    default:
      return state;
  }
}