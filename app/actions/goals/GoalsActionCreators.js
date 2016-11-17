import config from '../../../config';
import { toastr } from 'react-redux-toastr';
import { GOALS } from './GoalsConstants';
import fetchHelper from '../../helpers/fetchHelper';


const showAddGoalsModal = (showModal) => ({
  type: GOALS.ADD.SHOW_MODAL,
  showModal,
});

const showAddGoalsSpinner = (showSpinner) => ({
  type: GOALS.ADD.SHOW_SPINNER,
  showSpinner,
});

const updateAddGoalsField = (fieldKey, fieldValue) => ({
  type: GOALS.ADD.UPDATE_FIELD,
  fieldKey,
  fieldValue,
});

const resetGoalModal = () => ({
  type: GOALS.ADD.RESET,
});

const fetchGoals = () => (dispatch) => {
  dispatch({ type: GOALS.FETCH.START });

  return fetch(config.goals_api_url)
    .then(response => response.json())
    .then(goals => dispatch({ type: GOALS.FETCH.SUCCESS, goals }))
    .catch(errors => dispatch({ type: GOALS.FETCH.FAILURE, errors }));
};

const addGoalRequest = () => (dispatch, getState) => {
  const { name, description, tags, level, icon } = getState().goals.get('addGoalsModal').toJS();
  const parameters = fetchHelper.postOptions({
    name,
    description,
    tags,
    level,
    icon,
  });
  dispatch(showAddGoalsSpinner(true));
  return fetch(config.goals_api_url, parameters)
    .then(rawResponse => rawResponse.json())
    .then(response => {
      console.log(response);
      dispatch(resetGoalModal());
      toastr.success('', `Goal ${name} added.`);
    })
    .catch(errors => {
      console.error(errors);
      dispatch(resetGoalModal());
      toastr.error('', 'Sorry, something bad happen...');
    });
};


export default {
  showAddGoalsModal,
  showAddGoalsSpinner,
  updateAddGoalsField,
  resetGoalModal,
  fetchGoals,
  addGoalRequest,
};
