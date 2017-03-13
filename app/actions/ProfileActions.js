import httpClient from '../services/httpClient';
import config from '../../config';

export const PROFILE = {
  FETCH: {
    START: 'FETCH_PROFILE_START',
    SUCCESS: 'FETCH_PROFILE_SUCCESS',
    FAILURE: 'FETCH_PROFILE_FAILURE',
  },
  LIST: {
    START: 'LIST_PROFILE_START',
    SUCCESS: 'LIST_PROFILE_SUCCESS',
    FAILURE: 'LIST_PROFILE_FAILURE',
  },
  LIST_BY_SKILL: {
    START: 'LIST_BY_SKILL_PROFILE_START',
    SUCCESS: 'LIST_BY_SKILL_PROFILE_SUCCESS',
    FAILURE: 'LIST_BY_SKILL_PROFILE_FAILURE',
    CLEAR: 'LIST_BY_SKILL_PROFILE_CLEAR',
  },
};

export function fetchProfile(id) {
  return (dispatch) => {
    dispatch({ type: PROFILE.FETCH.START });

    return httpClient.get(`${config.profiles_api_url}/${id}`)
      .then(fetchedProfile => dispatch({ type: PROFILE.FETCH.SUCCESS, fetchedProfile }))
      .catch(error => dispatch({ type: PROFILE.FETCH.FAILURE, error }));
  };
}

export function profileList() {
  return (dispatch) => {
    dispatch({ type: PROFILE.LIST.START });

    return httpClient.get(config.profiles_api_url)
      .then(profiles => dispatch({ type: PROFILE.LIST.SUCCESS, profiles }))
      .catch(errors => dispatch({ type: PROFILE.LIST.FAILURE, errors }));
  };
}

export function profileListBySkill(slug, calledBy) {
  return (dispatch) => {
    dispatch({ type: PROFILE.LIST_BY_SKILL.START });

    return httpClient.get(`${config.profiles_api_url}?skillId=${slug}`)
      .then((profilesBySkill) => {
        const skill = { ...profilesBySkill, calledBy };
        dispatch({ type: PROFILE.LIST_BY_SKILL.SUCCESS, skill });
      })
      .catch(errors => dispatch({ type: PROFILE.LIST_BY_SKILL.FAILURE, errors }));
  };
}

export function clearSkill() {
  return dispatch => dispatch({ type: PROFILE.LIST_BY_SKILL.CLEAR });
}
