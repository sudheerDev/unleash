import { PROFILE } from '../actions/ProfileActions';

const initialState = {
  list: [],
  isLoading: false,
  profile: {},
};

function profilesReducer(state = initialState, action) {
  const profiles = [];
  const { fetchedProfile, error = [] } = action;

  switch (action.type) {
    case PROFILE.LIST.START:
      return {
        ...state,
        list: [],
        isLoading: true,
      };
    case PROFILE.LIST.SUCCESS:
      if (action.profiles.Count) {
        profiles.push(...action.profiles.Items);
      }
      return {
        ...state,
        list: profiles,
        isLoading: false,
      };
    case PROFILE.LIST.FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case PROFILE.FETCH.START:
      return {
        ...state,
        isLoading: true,
      };
    case PROFILE.FETCH.SUCCESS:
      return {
        ...state,
        profile: fetchedProfile.Item,
        isLoading: false,
      };
    case PROFILE.FETCH.FAILURE:
      return {
        ...state,
        error,
        profile: {},
        isLoading: false,
      };
    default:
      return state;
  }
}

export default profilesReducer;
