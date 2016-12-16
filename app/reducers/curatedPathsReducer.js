import { CURATED_PATHS } from '../actions/CuratedPathsActions';

const initialState = {
  list: [],
};

function curatedPathsReducer(state = initialState, action) {
  switch (action.type) {
    case CURATED_PATHS.FETCH.SUCCESS:
      return {
        ...state,
        list: action.paths,
      };
    default:
      return state;
  }
}

export default curatedPathsReducer;
