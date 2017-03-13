import {
  ANNOUNCEMENT_LIST_START,
  ANNOUNCEMENT_LIST_SUCCESS,
  ANNOUNCEMENT_LIST_FAILURE,
} from '../actions/AnnouncementActions';

const initialState = {
  list: null,
  isLoading: false,
};

function announcementsReducer(state = initialState, action) {
  const announcements = {};
  switch (action.type) {
    case ANNOUNCEMENT_LIST_START:
      return {
        ...state,
        list: null,
        isLoading: true,
      };
    case ANNOUNCEMENT_LIST_SUCCESS:
      action.announcements.forEach((a) => {
        announcements[a.id] = a;
      });
      return {
        ...state,
        list: announcements,
        isLoading: false,
      };
    case ANNOUNCEMENT_LIST_FAILURE:
      return {
        ...state,
        list: null,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default announcementsReducer;
