import { PROFILE } from '../actions/ProfileActions';

const initialState = {
  profiles: null,
  calledBy: null,
  isLoading: false,
};

function skillReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE.LIST_BY_SKILL.START:
      return {
        ...state,
        profiles: null,
        calledBy: null,
        isLoading: true,
      };
    case PROFILE.LIST_BY_SKILL.SUCCESS:
      return {
        ...state,
        profiles: action.skill.Count > 0 ? action.skill.Items.map((item) => item.userId) : [],
        calledBy: action.skill.calledBy,
        isLoading: false,
      };
    case PROFILE.LIST_BY_SKILL.FAILURE:
      return {
        ...state,
        profiles: null,
        calledBy: action.skill.calledBy,
        isLoading: false,
      };
    case PROFILE.LIST_BY_SKILL.CLEAR:
      return {
        ...state,
        profiles: null,
        calledBy: null,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default skillReducer;
