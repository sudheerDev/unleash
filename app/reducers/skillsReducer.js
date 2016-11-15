import { SKILL } from '../actions/SkillActions';

const initialState = {
  list: null,
  isLoading: false,
};

function skillsReducer(state = initialState, action) {
  const skills = {};
  switch (action.type) {
    case SKILL.FETCH.START:
      return {
        ...state,
        list: null,
        isLoading: true,
      };
    case SKILL.FETCH.SUCCESS:
      action.skills.forEach((skill) => {
        skills[skill.name] = skill;
      });
      return {
        ...state,
        list: skills,
        isLoading: false,
      };
    case SKILL.FETCH.FAILURE:
      return {
        ...state,
        list: null,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default skillsReducer;
