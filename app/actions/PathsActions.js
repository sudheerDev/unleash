/**
 * Unleash
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Kelvin De Moya <kelvin.demoya@x-team.com>
 */

import config from '../../config';
import fetchHelper from '../helpers/fetchHelper';
import slackService from '../services/slackService';
import { toastr } from 'react-redux-toastr';

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
  REMOVE: {
    START: 'REMOVE_PATHS_START',
    SUCCESS: 'REMOVE_PATHS_SUCCESS',
    FAILURE: 'REMOVE_PATHS_FAILURE',
  },
  UPDATE_GOAL: {
    START: 'UPDATE_PATHS_GOAL_START',
    SUCCESS: 'UPDATE_PATHS_GOAL_SUCCESS',
    FAILURE: 'UPDATE_PATHS_GOAL_FAILURE'
  },
  ADD_GOAL: {
    START: 'ADD_PATHS_GOAL_START',
    SUCCESS: 'ADD_PATHS_GOAL_SUCCESS',
    FAILURE: 'ADD_PATHS_GOAL_FAILURE'
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

export function pathsRemove(pathId) {
  return (dispatch) => {
    dispatch({ type: PATHS.REMOVE.START, pathId });

    return fetch(`${config.paths_api_url}/${pathId}`, {
      method: 'delete',
    })
      .then((response) => (response.status >= 400 ? Promise.reject(response.text()) : null))
      .then(() => dispatch({ type: PATHS.REMOVE.SUCCESS, pathId }))
      .catch((errors) => dispatch({ type: PATHS.REMOVE.FAILURE, errors }));
  };
}

export function pathsUpdateGoal(path, goal, data, slackOptions = {}) {
  const inflatedGoal = { ...goal, path };

  return (dispatch, getState) => {
    dispatch({ type: PATHS.UPDATE_GOAL.START, goal: inflatedGoal });

    return fetch(`${config.paths_api_url}/${path.id}/goals/${goal.id}`,
      {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(paths => {
        dispatch({ type: PATHS.UPDATE_GOAL.SUCCESS, paths, goal: inflatedGoal });

        if (slackOptions.notifyOnSlack) {
          const notificationParameters = {
            goal: inflatedGoal,
            user: getState().user.userData,
            additionalMessage: slackOptions.additionalMessage,
          };

          slackService.notifyAchieved(notificationParameters)
            .catch(() => toastr.error('', 'There was a problem with the slack notification'));
        }
      })
      .catch(errors => dispatch({ type: PATHS.UPDATE_GOAL.FAILURE, errors, goal: inflatedGoal }));
  };
}

export function addGoalToPathRequest() {
  return (dispatch, getState) => {
    const { name, description, tags, level, icon, path, dueDate } = getState().goals.addGoalsModal;
    const { profile } = getState().profiles;
    const parameters = fetchHelper.urlEncodedPostOptions({
      name,
      description,
      tags,
      level,
      icon,
      dueDate,
    });

    dispatch({ type: PATHS.ADD_GOAL.START });

    return fetch(`${config.paths_api_url}/${path}/goals`, parameters)
      .then(rawResponse => rawResponse.json())
      .then(() => {
        dispatch({ type: PATHS.ADD_GOAL.SUCCESS });
        dispatch(pathsList(profile.id));
        toastr.success('', `Goal ${name} added.`);
      })
      .catch(() => {
        dispatch({ type: PATHS.ADD_GOAL.FAILURE });
        toastr.error('', 'Sorry, something bad happen...');
      });
  };
}
