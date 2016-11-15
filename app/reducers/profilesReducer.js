import { PROFILE } from '../actions/ProfileActions';

const initialState = {
  list: null,
  isLoading: false,
  profile: {}
};

function profilesReducer(state = initialState, action) {
  const profiles = {};
  const { fetchedProfile, error = [] } = action;

  switch (action.type) {
    case PROFILE.LIST.START:
      return {
        ...state,
        list: null,
        isLoading: true,
      };
    case PROFILE.LIST.SUCCESS:
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
    case PROFILE.LIST.FAILURE:
      return {
        ...state,
        list: null,
        isLoading: false,
      };
    case PROFILE.FETCH.SUCCESS:
      return { ...state, profile: fetchedProfile.Item };
    case PROFILE.FETCH.FAILURE:
      return { ...state, error, profile: {} };

    default:
      return state;
  }
}

export default profilesReducer;
