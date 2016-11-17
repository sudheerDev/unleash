import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  list: [],
  isLoading: false,
  addGoalsModal: {
    showModal: false,
    showSpinner: false,
    name: '',
    description: '',
    tags: [],
  }
});

const getDefaultState = () => defaultState;

const fetchStart = (state) => state.set('isLoading', true);

const fetchSuccess = (state, action) =>
  state.set('isLoading', false).set('list', Immutable.fromJS(action.goals));

const fetchFailure = (state) => state.set('isLoading', false);

const showAddModal = (state, action) =>
  state.setIn(['addGoalsModal', 'showModal'], action.showModal);

const updateAddGoalsField = (state, action) =>
  state.setIn(['addGoalsModal', action.fieldKey], Immutable.fromJS(action.fieldValue));

const showAddGoalsSpinner = (state, action) =>
  state.setIn(['addGoalsModal', 'showSpinner'], action.showSpinner);

const resetGoalModal = (state) =>
  state.set('addGoalsModal', defaultState.get('addGoalsModal'));

export default {
  getDefaultState,
  fetchStart,
  fetchSuccess,
  fetchFailure,
  showAddModal,
  updateAddGoalsField,
  showAddGoalsSpinner,
  resetGoalModal,
};
