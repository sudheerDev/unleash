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
