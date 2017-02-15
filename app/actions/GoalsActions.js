import config from '../../config';
import httpClient from '../services/httpClient';
import { addNotifcation } from './NotificationActions';

export const GOALS = {
  FETCH: {
    START: 'FETCH_GOALS_START',
    SUCCESS: 'FETCH_GOALS_SUCCESS',
    FAILURE: 'FETCH_GOALS_FAILURE'
  },
  ADD: {
    UPDATE_FIELD: 'GOALS_ADD_UPDATE_FIELD',
    SHOW_MODAL: 'GOALS_ADD_SHOW_MODAL',
    SHOW_SPINNER: 'GOALS_ADD_SHOW_SPINNER',
    RESET: 'GOALS_ADD_RESET',
  }
};

export function showAddGoalsModal(showModal) {
  return {
    type: GOALS.ADD.SHOW_MODAL,
    showModal,
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
      icon
    };
    dispatch(showAddGoalsSpinner(true));
    return httpClient.post(config.goals_api_url, body)
      .then(() => {
        dispatch(resetGoalModal());
        dispatch(fetchGoals());
        dispatch(addNotifcation(`Goal ${name} added.`, 'success'));
      })
      .catch(() => {
        dispatch(resetGoalModal());
        dispatch(addNotifcation('Sorry, something bad happen...'));
      });
  };
}
