import { expect } from 'chai';
import * as NotificationActions from '../NotificationActions';

describe('Notifications Actions', () => {
  it('should create a success message', () => {
    const message = 'Mocked success message';
    const expectedAction = {
      type: NotificationActions.NOTIFICATION.ADD,
      payload: {
        message,
        type: 'success'
      }
    };
    expect(NotificationActions.addNotification(message, 'success')).to.deep.equal(expectedAction);
  });

  it('should create an error message', () => {
    const message = 'Mocked error message';
    const expectedAction = {
      type: NotificationActions.NOTIFICATION.ADD,
      payload: {
        message,
        type: 'error'
      }
    };
    expect(NotificationActions.addNotification(message)).to.deep.equal(expectedAction);
  });
});
