import config from '../../config';
import { range } from 'lodash';

import generateNews from '../testUtils/fixtures/news';

export const NEWS_LIST_START = 'NEWS_LIST_START';
export const NEWS_LIST_SUCCESS = 'NEWS_LIST_SUCCESS';
export const NEWS_LIST_FAILURE = 'NEWS_LIST_FAILURE';

function newsListStart() {
  return { type: NEWS_LIST_START };
}

export function newsListSuccess(news) {
  return { type: NEWS_LIST_SUCCESS, news };
}

export function newsListFailure(errors) {
  return { type: NEWS_LIST_FAILURE, errors };
}

export function newsList() {
  return (dispatch) => {
    dispatch(newsListStart());

    if (!config.news_api_url) {
      const news = range(10).map(generateNews);
      return dispatch(newsListSuccess(news));
    }

    return fetch(config.news_api_url)
      .then(response => response.json())
      .then(news => dispatch(newsListSuccess(news)))
      .catch(errors => dispatch(newsListFailure(errors)));
  };
}
