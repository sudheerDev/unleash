/**
 * Unleash
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Kelvin De Moya <kelvin.demoya@x-team.com>
 */

import httpClient from '../services/httpClient';
import config from '../../config';

export const PATHS = {
  FETCH: {
    START: 'FETCH_PATHS_START',
    SUCCESS: 'FETCH_PATHS_SUCCESS',
    FAILURE: 'FETCH_PATHS_FAILURE'
  },
  CREATE: {
    START: 'CREATE_PATHS_START',
    SUCCESS: 'CREATE_PATHS_SUCCESS',
    FAILURE: 'CREATE_PATHS_FAILURE'
  },
  UPDATE: {
    START: 'UPDATE_PATHS_START',
    SUCCESS: 'UPDATE_PATHS_SUCCESS',
    FAILURE: 'UPDATE_PATHS_FAILURE'
  },
  UPDATE_GOAL: {
    START: 'UPDATE_PATHS_GOAL_START',
    SUCCESS: 'UPDATE_PATHS_GOAL_SUCCESS',
    FAILURE: 'UPDATE_PATHS_GOAL_FAILURE'
  }
};

export function pathsList(userId) {
  return (dispatch) => {
    dispatch({ type: PATHS.FETCH.START });

    return httpClient.get(`${config.paths_api_url}?userId=${userId}`)
      .then(paths => dispatch({ type: PATHS.FETCH.SUCCESS, paths }))
      .catch(errors => dispatch({ type: PATHS.FETCH.FAILURE, errors }));
  };
}

export function pathsCreate(pathOwnerId) {
  return (dispatch) => {
    dispatch({ type: PATHS.CREATE.START });

    return httpClient.post(config.paths_api_url, { userId: pathOwnerId })
      .then(paths => dispatch({ type: PATHS.CREATE.SUCCESS, paths }))
      .catch(errors => dispatch({ type: PATHS.CREATE.FAILURE, errors }));
  };
}

export function pathsRename(pathId, newName) {
  return (dispatch) => {
    dispatch({ type: PATHS.UPDATE.START });

    return httpClient.put(`${config.paths_api_url}/${pathId}`, { name: newName })
      .then(paths => dispatch({ type: PATHS.UPDATE.SUCCESS, paths }))
      .catch(errors => dispatch({ type: PATHS.UPDATE.FAILURE, errors }));
  };
}

export function pathsUpdateGoal(path, goal, data) {
  const inflatedGoal = { ...goal, path };

  return (dispatch) => {
    dispatch({ type: PATHS.UPDATE_GOAL.START, goal: inflatedGoal });

    return httpClient.put(`${config.paths_api_url}/${path.id}/goals/${goal.id}`, data)
      .then(paths => dispatch({ type: PATHS.UPDATE_GOAL.SUCCESS, paths, goal: inflatedGoal }))
      .catch(errors => dispatch({ type: PATHS.UPDATE_GOAL.FAILURE, errors, goal: inflatedGoal }));
  };
}
