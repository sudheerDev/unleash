import { CURRATED_PATHS } from '../actions/CurratedPathsActions';

const initialState = {
  list: []
};

function curratedPathsReducer(state = initialState, action) {
  switch (action.type) {
    case CURRATED_PATHS.FETCH.SUCCESS:
      return {
        ...state,
        list: action.paths
      };
    default:
      return state;
  }
}

export default curratedPathsReducer;
