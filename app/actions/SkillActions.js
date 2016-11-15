import config from '../../config';

export const SKILL = {
  FETCH: {
    START: 'LIST_SKILL_START',
    SUCCESS: 'LIST_SKILL_SUCCESS',
    FAILURE: 'LIST_SKILL_FAILURE',
  }
};

export function skillList() {
  return (dispatch) => {
    dispatch({ type: SKILL.FETCH.START });

    return fetch(config.skills_api_url)
      .then(response => response.json())
      .then(skills => dispatch({ type: SKILL.FETCH.SUCCESS, skills }))
      .catch(errors => dispatch({ type: SKILL.FETCH.FAILURE, errors }));
  };
}
