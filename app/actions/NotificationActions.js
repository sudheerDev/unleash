export const NOTIFICATION = {
  ADD: 'ADD_NOTIFICATION',
  REMOVE: 'REMOVE_NOTIFICATION',
};

export function addNotification(message, type = 'error') {
  return {
    type: NOTIFICATION.ADD,
    payload: {
      message,
      type,
    },
  };
}

export function removeNotification() {
  return {
    type: NOTIFICATION.REMOVE,
  };
}
