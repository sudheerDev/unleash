export const NOTIFICATION = {
  ADD: 'ADD_NOTIFICATION',
  REMOVE: 'REMOVE_NOTIFICATION'
};

export function addNotifcation(message, type = 'error') {
  return {
    type: NOTIFICATION.ADD,
    payload: {
      message,
      type
    }
  };
}

export function removeNotifcation() {
  return {
    type: NOTIFICATION.REMOVE
  };
}
