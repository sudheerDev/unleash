/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import generate from '../../testUtils/fixtures';
import * as ProfileActions from '../ProfileActions';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import config from '../../../config';

describe('Profile Actions', () => {

  describe('Dispatch Actions', () => {
    const middlewares = [thunk];
    const store = configureStore(middlewares)();
    const dispatch = store.dispatch;

    afterEach(() => {
      store.clearActions();
      nock.cleanAll();
    });

    it('should call the dispatcher for profileList', () => {
      const path = '';

      const httpResponse = generate('profile', 15);
      const requestCall = nock(config.profiles_api_url).get(path).reply(200, httpResponse);

      const expectedActions = [
        { type: ProfileActions.PROFILE.LIST.START },
        { type: ProfileActions.PROFILE.LIST.SUCCESS, profiles: httpResponse }
      ];

      return dispatch(ProfileActions.profileList()).then(() => {
        expect(requestCall.isDone()).to.be.true;
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

  });

});
