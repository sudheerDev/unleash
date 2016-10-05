/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import generate from '../../testUtils/fixtures';
import * as PathsActions from '../PathsActions';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import config from '../../config/routes';

describe('Path Actions', () => {

  describe('Dispatch Actions', () => {
    const middlewares = [thunk];
    const store = configureStore(middlewares)();
    const dispatch = store.dispatch;

    afterEach(() => {
      store.clearActions();
      nock.cleanAll();
    });

    it('should call the dispatcher for pathsList', () => {
      const userId = 150;
      const hostname = 'http://paths-staging.unleash.x-team.com';
      const path = `/api/v1/paths?userId=${userId}`;

      const httpResponse = generate('path', 15, userId);
      const requestCall = nock(hostname).get(path).reply(200, httpResponse);

      const expectedActions = [
        {type: 'FETCH_PATHS_START'},
        {type: 'FETCH_PATHS_SUCCESS', paths: httpResponse }
      ];

      return dispatch(PathsActions.pathsList(userId)).then(() => {
        expect(requestCall.isDone()).to.be.true;
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should call the dispatcher for pathsCreate', () => {
      const userId = 150;
      const hostname = 'http://paths-staging.unleash.x-team.com';
      const path = `/api/v1/paths`;

      const httpResponse = generate('path', 15, userId);
      const requestCall = nock(hostname).post(path, {userId: userId}).reply(200, httpResponse);

      const expectedActions = [
        {type: 'CREATE_PATHS_START'},
        {type: 'CREATE_PATHS_SUCCESS', paths: httpResponse }
      ];

      return dispatch(PathsActions.pathsCreate(userId)).then(() => {
        expect(requestCall.isDone()).to.be.true;
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

  });

});
