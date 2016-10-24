/**
 * Unleash
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Kelvin De Moya <kelvin.demoya@x-team.com>
 */

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
  }
};

export function pathsList(userId) {
  return (dispatch) => {
    dispatch({ type: PATHS.FETCH.START });

    return fetch(`${config.paths_api_url}?userId=${userId}`)
      .then(response => response.json())
      .then(paths => dispatch({ type: PATHS.FETCH.SUCCESS, paths }))
      .catch(errors => dispatch({ type: PATHS.FETCH.FAILURE, errors }));
  };
}

export function pathsCreate(pathOwnerId) {
  return (dispatch) => {
    dispatch({ type: PATHS.CREATE.START });

    return fetch(config.paths_api_url,
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: pathOwnerId })
      })
      .then(response => response.json())
      .then(paths => dispatch({ type: PATHS.CREATE.SUCCESS, paths }))
      .catch(errors => dispatch({ type: PATHS.CREATE.FAILURE, errors }));
  };
}

export function pathsRename(pathId, newName) {
  return (dispatch) => {
    dispatch({ type: PATHS.UPDATE.START });

    return fetch(`${config.paths_api_url}/${pathId}`,
      {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName }),
      })
      .then(response => response.json())
      .then(paths => dispatch({ type: PATHS.UPDATE.SUCCESS, paths }))
      .catch(errors => dispatch({ type: PATHS.UPDATE.FAILURE, errors }));
  };
}
