/* eslint-disable */
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import generate from '../../testUtils/fixtures';
import * as PathsActions from '../PathsActions';
import nock from 'nock';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import config from '../../../config';

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
      const path = `?userId=${userId}`;

      const httpResponse = generate('path', 15, 150);
      const requestCall = nock(config.paths_api_url).get(path).reply(200, httpResponse);

      const expectedActions = [
        { type: PathsActions.PATHS.FETCH.START },
        { type: PathsActions.PATHS.FETCH.SUCCESS, paths: httpResponse }
      ];

      return dispatch(PathsActions.pathsList(userId)).then(() => {
        expect(requestCall.isDone()).to.be.true;
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    it('should call the dispatcher for pathsCreate', () => {
      const userId = 150;
      const path = '';

      const httpResponse = generate('path', 15, userId);
      const requestCall = nock(config.paths_api_url).post(path, {userId: userId}).reply(200, httpResponse);

      const expectedActions = [
        { type: PathsActions.PATHS.CREATE.START },
        { type: PathsActions.PATHS.CREATE.SUCCESS, paths: httpResponse }
      ];

      return dispatch(PathsActions.pathsCreate(userId)).then(() => {
        expect(requestCall.isDone()).to.be.true;
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

  });

});
