import { GOALS } from '../actions/GoalsActions';

const initialState = {
  list: [],
  isLoading: false,
  addGoalsModal: {
    showModal: false,
    showSpinner: false,
    name: '',
    description: '',
    tags: [],
    icon: '',
    level: '',
  }
};

function goalsReducer(state = initialState, action) {
  switch (action.type) {
    case GOALS.FETCH.START:
      return {
        ...state,
        isLoading: true
      };
    case GOALS.FETCH.SUCCESS:
      return {
        ...state,
        list: action.goals,
        isLoading: false
      };
    case GOALS.FETCH.FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case GOALS.ADD.SHOW_MODAL:
      return {
        ...state,
        addGoalsModal: {
          ...state.addGoalsModal,
          showModal: action.showModal,
        }
      };
    case GOALS.ADD.SHOW_SPINNER:
      return {
        ...state,
        addGoalsModal: {
          ...state.addGoalsModal,
          showModal: action.showSpinner,
        }
      };
    case GOALS.ADD.UPDATE_FIELD:
      return {
        ...state,
        addGoalsModal: {
          ...state.addGoalsModal,
          [action.fieldKey]: action.fieldValue,
        }
      };
    case GOALS.ADD.RESET:
      return {
        ...state,
        addGoalsModal: {
          ...initialState.addGoalsModal,
          tags: [],
        }
      };
    default:
      return state;
  }
}

export default goalsReducer;
