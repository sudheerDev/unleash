import { NEWS_LIST_START, NEWS_LIST_SUCCESS, NEWS_LIST_FAILURE } from '../actions/NewsActions';

const initialState = {
  list: null,
  isLoading: false,
};

function newsReducer(state = initialState, action) {
  const news = {};
  switch (action.type) {
    case NEWS_LIST_START:
      return {
        ...state,
        list: null,
        isLoading: true,
      };
    case NEWS_LIST_SUCCESS:
      action.news.forEach((n) => {
        news[n.id] = n;
      });
      return {
        ...state,
        list: news,
        isLoading: false,
      };
    case NEWS_LIST_FAILURE:
      return {
        ...state,
        list: null,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default newsReducer;
