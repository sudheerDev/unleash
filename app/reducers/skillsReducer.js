import { cloneDeep } from 'lodash';
import { SKILL } from '../actions/SkillActions';
/**
 * Update a skill inside the skills list.
 * @param  {object}  skills     The list of skills.
 * @param  {object}  skill      The skill to update.
 * @return {object}             The updated result.
 */
function updateOne(skills, skill) {
  const upsdatedSkills = cloneDeep(skills);
  upsdatedSkills[skill.name] = skill;
  return upsdatedSkills;
}

const initialState = {
  list: [],
  isLoading: false,
  addSkillModal: {
    showModal: false,
    showSpinner: false,
    name: '',
  },
};

function skillsReducer(state = initialState, action) {
  const { updatedSkill, errors = [] } = action;
  switch (action.type) {
    case SKILL.FETCH.START:
      return {
        ...state,
        list: [],
        isLoading: true,
      };
    case SKILL.FETCH.SUCCESS:
      return {
        ...state,
        list: action.skills,
        isLoading: false,
      };
    case SKILL.FETCH.FAILURE:
      return {
        ...state,
        list: [],
        isLoading: false,
      };
    case SKILL.ADD_RESOURCE.START:
      return { ...state, errors };
    case SKILL.ADD_RESOURCE.SUCCESS:
      // The API return the affected skill object.
      return { ...state, errors, list: updateOne(state.list, updatedSkill) };
    case SKILL.ADD_RESOURCE.FAILURE:
      return { ...state, errors };
    case SKILL.ADD.UPDATE_FIELD:
      return {
        ...state,
        addSkillModal: {
          ...state.addSkillModal,
          [action.fieldKey]: action.fieldValue,
        },
      };
    case SKILL.ADD.SHOW_MODAL:
      return {
        ...state,
        addSkillModal: {
          ...state.addSkillModal,
          showModal: action.showModal,
        },
      };
    case SKILL.ADD.SHOW_SPINNER:
      return {
        ...state,
        addSkillModal: {
          ...state.addSkillModal,
          showModal: action.showSpinner,
        },
      };
    case SKILL.ADD.RESET:
      return {
        ...state,
        addSkillModal: {
          ...initialState.addSkillModal,
        },
      };
    default:
      return state;
  }
}

export default skillsReducer;
