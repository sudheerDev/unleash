/**
 * Unleash
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Kelvin De Moya <kelvin.demoya@x-team.com>
 */

import httpClient from '../services/httpClient';
import config from '../../config';
import slackService from '../services/slackService';
import { addNotification } from './NotificationActions';

export const PATHS = {
  FETCH: {
    START: 'FETCH_PATHS_START',
    SUCCESS: 'FETCH_PATHS_SUCCESS',
    FAILURE: 'FETCH_PATHS_FAILURE',
  },
  CREATE: {
    START: 'CREATE_PATHS_START',
    SUCCESS: 'CREATE_PATHS_SUCCESS',
    FAILURE: 'CREATE_PATHS_FAILURE',
  },
  UPDATE: {
    START: 'UPDATE_PATHS_START',
    SUCCESS: 'UPDATE_PATHS_SUCCESS',
    FAILURE: 'UPDATE_PATHS_FAILURE',
  },
  REMOVE: {
    START: 'REMOVE_PATHS_START',
    SUCCESS: 'REMOVE_PATHS_SUCCESS',
    FAILURE: 'REMOVE_PATHS_FAILURE',
  },
  UPDATE_GOAL: {
    START: 'UPDATE_PATHS_GOAL_START',
    SUCCESS: 'UPDATE_PATHS_GOAL_SUCCESS',
    FAILURE: 'UPDATE_PATHS_GOAL_FAILURE',
  },
  ADD_GOAL: {
    START: 'ADD_PATHS_GOAL_START',
    SUCCESS: 'ADD_PATHS_GOAL_SUCCESS',
    FAILURE: 'ADD_PATHS_GOAL_FAILURE',
  },
  ADD_EXISTING_GOAL: {
    START: 'ADD_PATHS_EXISTING_GOAL_START',
    SUCCESS: 'ADD_PATHS_EXISTING_GOAL_SUCCESS',
    FAILURE: 'ADD_PATHS_EXISTING_GOAL_FAILURE',
  },
  REMOVE_GOAL: {
    START: 'REMOVE_PATHS_GOAL_START',
    SUCCESS: 'REMOVE_PATHS_GOAL_SUCCESS',
    FAILURE: 'REMOVE_PATHS_GOAL_FAILURE',
  },
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

export function pathsRemove(pathId) {
  return (dispatch) => {
    dispatch({ type: PATHS.REMOVE.START, pathId });

    return httpClient.delete(`${config.paths_api_url}/${pathId}`)
      .then(() => dispatch({ type: PATHS.REMOVE.SUCCESS, pathId }))
      .catch(errors => dispatch({ type: PATHS.REMOVE.FAILURE, errors }));
  };
}

export function removeGoalFromPath(goal, path, userId) {
  return (dispatch) => {
    dispatch({ type: PATHS.REMOVE_GOAL.START });

    return httpClient.delete(`${config.paths_api_url}/${path.id}/goals/${goal.id}`)
      .then(() => {
        dispatch({ type: PATHS.REMOVE_GOAL.SUCCESS });
        dispatch(pathsList(userId));
        dispatch(addNotification(`Goal ${goal.name} removed.`, 'success'));
      })
      .catch(() => {
        dispatch({ type: PATHS.REMOVE_GOAL.FAILURE });
        dispatch(addNotification('Sorry, something bad happen...'));
      });
  };
}

export function pathsUpdateGoal(path, goal, data, slackOptions = {}) {
  const inflatedGoal = { ...goal, path };

  return (dispatch) => {
    dispatch({ type: PATHS.UPDATE_GOAL.START, goal: inflatedGoal });

    return httpClient.put(`${config.paths_api_url}/${path.id}/goals/${goal.id}`, data)
      .then((paths) => {
        dispatch({ type: PATHS.UPDATE_GOAL.SUCCESS, paths, goal: inflatedGoal });

        if (slackOptions.notifyOnSlack) {
          const notificationParameters = {
            goal: inflatedGoal,
            user: slackOptions.profile,
            additionalMessage: slackOptions.additionalMessage,
          };

          slackService.notifyAchieved(notificationParameters)
            .catch((error) => {
              console.log('Slack notification error', error);
              dispatch(addNotification('There was a problem with the slack notification'));
            });
        }
      })
      .catch(errors => dispatch({ type: PATHS.UPDATE_GOAL.FAILURE, errors, goal: inflatedGoal }));
  };
}

export function addExistingGoalToPathRequest(goal, path, profile) {
  return (dispatch) => {
    const { name, description, tags, level, icon } = goal;
    const parameters = { name, description, tags, level, icon };

    dispatch({ type: PATHS.ADD_EXISTING_GOAL.START });

    return httpClient.post(`${config.paths_api_url}/${path}/goals`, parameters)
      .then(() => {
        dispatch({ type: PATHS.ADD_EXISTING_GOAL.SUCCESS });
        dispatch(pathsList(profile.id));
        dispatch(addNotification(`Goal ${name} added.`, 'success'));
      })
      .catch(() => {
        dispatch({ type: PATHS.ADD_EXISTING_GOAL.FAILURE });
        dispatch(addNotification('Sorry, something bad happen...'));
      });
  };
}

export function addGoalToPathRequest() {
  return (dispatch, getState) => {
    const { name, description, tags, level, icon, path, dueDate } = getState().goals.addGoalsModal;
    const { profile } = getState().profiles;
    const parameters = {
      name,
      description,
      tags,
      level,
      icon,
      dueDate,
    };

    dispatch({ type: PATHS.ADD_GOAL.START });

    return httpClient.post(`${config.paths_api_url}/${path}/goals`, parameters)
      .then(() => {
        dispatch({ type: PATHS.ADD_GOAL.SUCCESS });
        dispatch(pathsList(profile.id));
        dispatch(addNotification(`Goal ${name} added.`, 'success'));
      })
      .catch(() => {
        dispatch({ type: PATHS.ADD_GOAL.FAILURE });
        dispatch(addNotification('Sorry, something bad happen...'));
      });
  };
}
