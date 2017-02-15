import config from '../../config';
import httpClient from '../services/httpClient';
import { addNotification } from './NotificationActions';

export const GOALS = {
  FETCH: {
    START: 'FETCH_GOALS_START',
    SUCCESS: 'FETCH_GOALS_SUCCESS',
    FAILURE: 'FETCH_GOALS_FAILURE',
  },
  ADD: {
    UPDATE_FIELD: 'GOALS_ADD_UPDATE_FIELD',
    SHOW_MODAL: 'GOALS_ADD_SHOW_MODAL',
    SHOW_SPINNER: 'GOALS_ADD_SHOW_SPINNER',
    RESET: 'GOALS_ADD_RESET',
  },
  ADD_EXISTING: {
    SHOW_MODAL: 'GOALS_ADD_EXISTING_SHOW_MODAL',
    RESET: 'GOALS_ADD_EXISTING_RESET',
    UPDATE_PATH: 'GOALS_ADD_EXISTING_UPDATE_PATH',
    UPDATE_GOAL: 'GOALS_ADD_EXISTING_UPDATE_GOAL',
  }
};

export function showAddGoalsModal(showModal) {
  return {
    type: GOALS.ADD.SHOW_MODAL,
    showModal,
  };
}

export function showAddExistingGoalsModal(showModal) {
  return {
    type: GOALS.ADD_EXISTING.SHOW_MODAL,
    showModal,
  };
}

export function resetExistingGoalModal() {
  return {
    type: GOALS.ADD_EXISTING.RESET,
  };
}

export function showAddGoalsSpinner(showSpinner) {
  return {
    type: GOALS.ADD.SHOW_SPINNER,
    showSpinner,
  };
}

export function updateAddGoalsField(fieldKey, fieldValue) {
  return {
    type: GOALS.ADD.UPDATE_FIELD,
    fieldKey,
    fieldValue,
  };
}

export function updateSelectedPath(selectedPath) {
  return {
    type: GOALS.ADD_EXISTING.UPDATE_PATH,
    selectedPath
  };
}

export function updateSelectedGoal(selectedGoal) {
  return {
    type: GOALS.ADD_EXISTING.UPDATE_GOAL,
    selectedGoal
  };
}

export function resetGoalModal() {
  return {
    type: GOALS.ADD.RESET,
  };
}

export function fetchGoals() {
  return (dispatch) => {
    dispatch({ type: GOALS.FETCH.START });

    return httpClient.get(config.goals_api_url)
      .then(goals => dispatch({ type: GOALS.FETCH.SUCCESS, goals }))
      .catch(errors => dispatch({ type: GOALS.FETCH.FAILURE, errors }));
  };
}

export function addGoalRequest() {
  return (dispatch, getState) => {
    const { name, description, tags, level, icon } = getState().goals.addGoalsModal;
    const body = {
      name,
      description,
      tags,
      level,
      icon,
    };
    dispatch(showAddGoalsSpinner(true));
    return httpClient.post(config.goals_api_url, body)
      .then(() => {
        dispatch(resetGoalModal());
        dispatch(fetchGoals());
        dispatch(addNotification(`Goal ${name} added.`, 'success'));
      })
      .catch(() => {
        dispatch(resetGoalModal());
        dispatch(addNotification('Sorry, something bad happen...'));
      });
  };
}
