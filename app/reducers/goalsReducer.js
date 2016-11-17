import { GOALS } from '../actions/goals/GoalsConstants';
import goalsReducerFunctions from '../actions/goals/GoalsReducerFunctions';

function goalsReducer(state = goalsReducerFunctions.getDefaultState(), action) {
  switch (action.type) {

    // Fetch actions
    case GOALS.FETCH.START:
      return goalsReducerFunctions.fetchStart(state, action);
    case GOALS.FETCH.SUCCESS:
      return goalsReducerFunctions.fetchSuccess(state, action);
    case GOALS.FETCH.FAILURE:
      return goalsReducerFunctions.fetchFailure(state, action);

    // Add Goals actions
    case GOALS.ADD.SHOW_MODAL:
      return goalsReducerFunctions.showAddModal(state, action);
    case GOALS.ADD.SHOW_SPINNER:
      return goalsReducerFunctions.showAddGoalsSpinner(state, action);
    case GOALS.ADD.UPDATE_FIELD:
      return goalsReducerFunctions.updateAddGoalsField(state, action);
    case GOALS.ADD.RESET:
      return goalsReducerFunctions.resetGoalModal(state, action);

    default:
      return state;
  }
}

export default goalsReducer;
