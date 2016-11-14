import config from '../../config';

export const FETCH_PROFILE_START = 'FETCH_PROFILE_START';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';
export const PROFILE_LIST_START = 'PROFILE_LIST_START';
export const PROFILE_LIST_SUCCESS = 'PROFILE_LIST_SUCCESS';
export const PROFILE_LIST_FAILURE = 'PROFILE_LIST_FAILURE';
export const PROFILE_LIST_BY_SKILL_START = 'PROFILE_LIST_BY_SKILL';
export const PROFILE_LIST_BY_SKILL_SUCCESS = 'PROFILE_LIST_BY_SKILL_SUCCESS';
export const PROFILE_LIST_BY_SKILL_FAILURE = 'PROFILE_LIST_BY_SKILL_FAILURE';
export const PROFILE_LIST_BY_SKILL_CLEAR = 'PROFILE_LIST_BY_SKILL_CLEAR';

function fetchProfileStart() {
  return { type: FETCH_PROFILE_START };
}

function fetchProfileSuccess(fetchedProfile) {
  return { type: FETCH_PROFILE_SUCCESS, fetchedProfile };
}

function fetchProfileFailure(error) {
  return { type: FETCH_PROFILE_FAILURE, error };
}

function profileListStart() {
  return { type: PROFILE_LIST_START };
}

export function profileListSuccess(profiles) {
  return { type: PROFILE_LIST_SUCCESS, profiles };
}

export function profileListFailure(errors) {
  return { type: PROFILE_LIST_FAILURE, errors };
}

function profileListBySkillStart() {
  return { type: PROFILE_LIST_BY_SKILL_START };
}

function profileListBySkillSuccess(skill) {
  return { type: PROFILE_LIST_BY_SKILL_SUCCESS, skill };
}

function profileListBySkillFailure(error) {
  return { type: PROFILE_LIST_BY_SKILL_FAILURE, error };
}


export function fetchProfile(id) {
  return (dispatch) => {
    dispatch((fetchProfileStart()));

    return fetch(`${config.profiles_api_url}/${id}`)
      .then(response => response.json())
      .then(fetchedProfile => dispatch(fetchProfileSuccess(fetchedProfile)))
      .catch(error => dispatch(fetchProfileFailure(error)));
  };
}

export function profileList() {
  return (dispatch) => {
    dispatch(profileListStart());

    return fetch(config.profiles_api_url)
      .then(response => response.json())
      .then(profiles => dispatch(profileListSuccess(profiles)))
      .catch(errors => dispatch(profileListFailure(errors)));
  };
}

export function profileListBySkill(slug, calledBy) {
  return (dispatch) => {
    dispatch(profileListBySkillStart());

    return fetch(`${config.profiles_api_url}?skillId=${slug}`)
      .then(response => response.json())
      .then(profilesBySkill => {
        dispatch(profileListBySkillSuccess({ ...profilesBySkill, calledBy }));
      })
      .catch(errors => dispatch(profileListBySkillFailure(errors)));
  };
}

export function clearSkill() {
  return (dispatch) => dispatch({ type: PROFILE_LIST_BY_SKILL_CLEAR });
}
