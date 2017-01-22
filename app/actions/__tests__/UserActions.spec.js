import { expect } from 'chai';
import * as UserActions from '../UserActions';
import generate from '../../testUtils/fixtures';

describe('User Action Creators', () => {
  it('should create an action for user login', () => {
    const userData = generate('user', 1)[0];
    const expectedAction = {
      type: UserActions.USER.AUTH.LOGIN_SUCCESS,
      userData
    };
    expect(UserActions.userLogin(userData)).to.deep.equal(expectedAction);
  });

  it('should create an action for user logout', () => {
    const expectedAction = {
      type: UserActions.USER.AUTH.LOGOUT,
    };
    expect(UserActions.userLogout()).to.deep.equal(expectedAction);
  });

  it('should create an action to show the spinner', () => {
    const expectedAction = {
      type: UserActions.USER.AUTH.LOGIN_START,
    };
    expect(UserActions.startLoginProcess()).to.deep.equal(expectedAction);
  });

  it('should create an action for a failure login', () => {
    const expectedAction = {
      type: UserActions.USER.AUTH.LOGIN_FAILURE,
    };
    expect(UserActions.userLoginFailure()).to.deep.equal(expectedAction);
  });
});
