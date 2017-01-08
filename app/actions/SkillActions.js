import { toastr } from 'react-redux-toastr';
import config from '../../config';
import fetchHelper from '../helpers/fetchHelper';

export const SKILL = {
  FETCH: {
    START: 'LIST_SKILL_START',
    SUCCESS: 'LIST_SKILL_SUCCESS',
    FAILURE: 'LIST_SKILL_FAILURE',
  },
  ADD_RESOURCE: {
    START: 'ADD_RESOURCE_START',
    SUCCESS: 'ADD_RESOURCE_SUCCESS',
    FAILURE: 'ADD_RESOURCE_FAILURE'
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

    return fetch(`${config.skills_api_url}.json`)
      .then(response => response.json())
      .then(skills => dispatch({ type: SKILL.FETCH.SUCCESS, skills }))
      .catch(errors => dispatch({ type: SKILL.FETCH.FAILURE, errors }));
  };
}

export function resourceAdd(skillSlug, resource) {
  return (dispatch) => {
    dispatch({ type: SKILL.ADD_RESOURCE.START });
    const parameters = fetchHelper.postOptions(resource);
    return fetch(`${config.skills_api_url}/${skillSlug}/resources.json`, parameters)
      .then(response => response.json())
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
    const parameters = fetchHelper.urlEncodedPostOptions({
      name,
    });
    dispatch(showAddSkillSpinner(true));
    return fetch(config.skills_api_url, parameters)
      .then(rawResponse => rawResponse.json())
      .then(() => {
        dispatch(resetSkillModal());
        dispatch(skillList());
        toastr.success('', `${name} skill added.`);
      })
      .catch(() => {
        dispatch(resetSkillModal());
        toastr.error('', 'Sorry, something bad happened...');
      });
  };
}
