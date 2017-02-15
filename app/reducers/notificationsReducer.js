import { NOTIFICATION } from '../actions/NotificationActions';

const initialState = [];

function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION.ADD:
      return [
        ...state,
        action.payload
      ];
    case NOTIFICATION.REMOVE:
      return [
        ...state.slice(1)   // remove the first one only
      ];
    default:
      return state;
  }
}

export default notificationsReducer;
