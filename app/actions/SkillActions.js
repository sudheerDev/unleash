import httpClient from '../services/httpClient';
import config from '../../config';
import { addNotification } from './NotificationActions';

export const SKILL = {
  FETCH: {
    START: 'LIST_SKILL_START',
    SUCCESS: 'LIST_SKILL_SUCCESS',
    FAILURE: 'LIST_SKILL_FAILURE',
  },
  ADD_RESOURCE: {
    START: 'ADD_RESOURCE_START',
    SUCCESS: 'ADD_RESOURCE_SUCCESS',
    FAILURE: 'ADD_RESOURCE_FAILURE',
  },
  ADD: {
    UPDATE_FIELD: 'SKILL_ADD_UPDATE_FIELD',
    SHOW_MODAL: 'SKILL_ADD_SHOW_MODAL',
    SHOW_SPINNER: 'SKILL_ADD_SHOW_SPINNER',
    RESET: 'GOALS_ADD_RESET',
  },
};

export function skillList() {
  return (dispatch) => {
    dispatch({ type: SKILL.FETCH.START });

    return httpClient.get(config.skills_api_url)
      .then(skills => dispatch({ type: SKILL.FETCH.SUCCESS, skills }))
      .catch(errors => dispatch({ type: SKILL.FETCH.FAILURE, errors }));
  };
}

export function resourceAdd(skillSlug, resource) {
  return (dispatch) => {
    dispatch({ type: SKILL.ADD_RESOURCE.START });
    return httpClient.post(`${config.skills_api_url}/${skillSlug}/resources.json`, resource)
      .then(updatedSkill => dispatch({ type: SKILL.ADD_RESOURCE.SUCCESS, updatedSkill }))
      .catch(errors => dispatch({ type: SKILL.ADD_RESOURCE.FAILURE, errors }));
  };
}

export function showAddSkillModal(showModal) {
  return {
    type: SKILL.ADD.SHOW_MODAL,
    showModal,
  };
}

export function showAddSkillSpinner(showSpinner) {
  return {
    type: SKILL.ADD.SHOW_SPINNER,
    showSpinner,
  };
}

export function resetSkillModal() {
  return {
    type: SKILL.ADD.RESET,
  };
}

export function updateAddSkillField(fieldKey, fieldValue) {
  return {
    type: SKILL.ADD.UPDATE_FIELD,
    fieldKey,
    fieldValue,
  };
}

export function addSkillRequest() {
  return (dispatch, getState) => {
    const { name } = getState().skills.addSkillModal;
    dispatch(showAddSkillSpinner(true));
    return httpClient.post(config.skills_api_url, { name })
      .then(() => {
        dispatch(resetSkillModal());
        dispatch(skillList());
        dispatch(addNotification(`${name} skill added.`, 'success'));
      })
      .catch(() => {
        dispatch(resetSkillModal());
        dispatch(addNotification('Sorry, something bad happened...'));
      });
  };
}
