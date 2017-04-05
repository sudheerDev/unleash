import React from 'react';
import { expect } from 'chai';
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

    it('should call the dispatcher for the moveGoalToPath', () => {
      const userId = 150;
      const path = generate('path', 1, userId)[0];
      const goal = path.goals[0];
      const newPath = {
        goals: [goal],
        id: '123-456-789-xx',
        name: 'new path',
        userId,
      };
      const deleteGoalRequestCall = nock(config.paths_api_url).delete(`/${path.id}/goals/${goal.id}`).reply(204);
      const addGoalRequestCall = nock(config.paths_api_url).post(`/${newPath.id}/goals`, ...goal).reply(200, newPath);
      const fetchPathsRequestCall = nock(config.paths_api_url).get(`?userId=${userId}`).reply(200, {});
      const expectedActions = [
        { type: PathsActions.PATHS.MOVE_GOAL.START },
        { type: PathsActions.PATHS.MOVE_GOAL.SUCCESS },
        { type: PathsActions.PATHS.FETCH.START },
        { type: PathsActions.PATHS.FETCH.SUCCESS,
          paths: {}
        }
      ];

      return dispatch(PathsActions.moveGoalToPath(goal, path, userId, newPath)).then(() => {
        expect(deleteGoalRequestCall.isDone()).to.be.true;
        expect(addGoalRequestCall.isDone()).to.be.true;
        expect(fetchPathsRequestCall.isDone()).to.be.true;
        expect(store.getActions()).to.deep.equal(expectedActions);
      })
    });
  });
});
