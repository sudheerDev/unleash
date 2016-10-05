/* eslint-disable */
import { expect } from 'chai';
import Immutable from 'immutable';
import userReducer from '../userReducer';
import UserActionCreators from '../../actions/user/UserActionCreators';
import userReducerFunctions from '../../actions/user/UserReducerFunctions';
import generate from '../../testUtils/fixtures';
import curratedPathsReducer from '../curratedPathsReducer';

describe('User Reducer', () => {
  const defaultState = userReducerFunctions.getDefaultState();

  it('should return the user reducer default state', () => {
    expect(userReducer(defaultState, {type: 'NONE'})).to.deep.equal(defaultState);
  });

  it('should return the currated paths reducer default state', () => {
    expect(curratedPathsReducer({list: []}, {type: 'NONE'})).to.deep.equal({list: []});
  });

  it('should return the user state with the isLogged true and the user data', () => {
    const fakeUser = generate('user', 1)[0];
    const state = Immutable.fromJS(defaultState);
    const action = UserActionCreators.userLogin(fakeUser);

    const expectedValue = Object.assign({}, defaultState.toJS(), {
      isLoggedIn: true,
      userData: fakeUser
    });
    expect(userReducer(state, action).toJS()).to.deep.equal(expectedValue);
  });

  it('should return the user state with the isLogged false and the user data empty', () => {
    const fakeUser = generate('user', 1)[0];
    const state = Immutable.fromJS({
      isLoggedIn: true,
      userData: fakeUser
    });
    const action = UserActionCreators.userLogout();
    expect(userReducer(state, action)).to.deep.equal(defaultState);
  });
});
