import { expect } from 'chai';
import * as UserActions from '../UserActions';
import generate from '../../testUtils/fixtures';

describe('User Action Creators', () => {
  it('should create an action for user login', () => {
    const userData = generate('user', 1)[0];
    const expectedAction = {
      type: UserActions.USER.LOGIN,
      userData
    };
    expect(UserActions.userLogin(userData)).to.deep.equal(expectedAction);
  });

  it('should create an action for user logout', () => {
    const expectedAction = {
      type: UserActions.USER.LOGOUT,
    };
    expect(UserActions.userLogout()).to.deep.equal(expectedAction);
  });
});
