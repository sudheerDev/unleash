import {
  PROFILE_LIST_START,
  PROFILE_LIST_SUCCESS,
  PROFILE_LIST_FAILURE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE
} from '../actions/ProfileActions';

const initialState = {
  list: null,
  isLoading: false,
  profile: {}
};

function profilesReducer(state = initialState, action) {
  const profiles = {};
  const { fetchedProfile, error = [] } = action;
  switch (action.type) {
    case PROFILE_LIST_START:
      return {
        ...state,
        list: null,
        isLoading: true,
      };
    case PROFILE_LIST_SUCCESS:
      if (action.profiles.Count) {
        action.profiles.Items.forEach((profile) => {
          profiles[profile.username] = profile;
        });
      }
      return {
        ...state,
        list: profiles,
        isLoading: false,
      };
    case PROFILE_LIST_FAILURE:
      return {
        ...state,
        list: null,
        isLoading: false,
      };
    case FETCH_PROFILE_SUCCESS:
      return { ...state, profile: fetchedProfile.Item };
    case FETCH_PROFILE_FAILURE:
      return { ...state, error, profile: {} };

    default:
      return state;
  }
}

export default profilesReducer;
