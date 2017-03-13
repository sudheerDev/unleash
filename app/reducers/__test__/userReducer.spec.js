/* eslint-disable */
import { expect } from 'chai';
import userReducer, { initialState } from '../userReducer';
import * as UserActions from '../../actions/UserActions';
import generate from '../../testUtils/fixtures';
import curatedPathsReducer from '../curatedPathsReducer';

describe('User Reducer', () => {

  it('should return the user reducer default state', () => {
    expect(userReducer()).to.deep.equal(initialState);
  });

  it('should return the curated paths reducer default state', () => {
    expect(curatedPathsReducer({list: []}, {type: 'NONE'})).to.deep.equal({list: []});
  });

  it('should return the user state with the isLogged true and the user data', () => {
    const fakeUser = generate('user', 1)[0];
    const action = UserActions.userLogin(fakeUser);

    const expectedValue = {
      ...initialState,
      authServiceInit: true,
      isLoggedIn: true,
      userData: fakeUser
    };
    expect(userReducer(initialState, action)).to.deep.equal(expectedValue);
  });

  it('should return the user state with the isLogged false and the user data empty', () => {
    const fakeUser = generate('user', 1)[0];
    const state = {
      authServiceInit: true,
      isLoggedIn: true,
      userData: fakeUser
    };
    const expectedValue = Object.assign({}, initialState, { authServiceInit: true});
    const action = UserActions.userLogout();
    expect(userReducer(state, action)).to.deep.equal(expectedValue);
  });

  it('should return the user state with the isLogged false, the user data empty and the loading' +
    'equal to true', () => {
    const expectedValue = {
      authServiceInit: true,
      isLoggedIn: false,
      isLoading: true,
      userData: {
        id: null,
        fullName: null,
        isAdmin: false,
        picture: null,
        firstName: null,
        lastName: null,
        email: null,
        username: null
      }
    };
    const action = UserActions.startLoginProcess();
    expect(userReducer(initialState, action)).to.deep.equal(expectedValue);
  });

  it('should return the user state with the isLogged false and the user data empty when the login process fail', () => {
    const fakeUser = generate('user', 1)[0];
    const state = {
      authServiceInit: true,
      isLoggedIn: true,
      userData: fakeUser
    };
    const expectedValue = Object.assign({}, initialState, { authServiceInit: true});
    const action = UserActions.userLoginFailure();
    expect(userReducer(state, action)).to.deep.equal(expectedValue);
  });
});
