import range from 'lodash/range';
import config from '../../config';
import httpClient from '../services/httpClient';

import generateAnnouncement from '../testUtils/fixtures/announcement';

export const ANNOUNCEMENT_LIST_START = 'ANNOUNCEMENT_LIST_START';
export const ANNOUNCEMENT_LIST_SUCCESS = 'ANNOUNCEMENT_LIST_SUCCESS';
export const ANNOUNCEMENT_LIST_FAILURE = 'ANNOUNCEMENT_LIST_FAILURE';

function announcementListStart() {
  return { type: ANNOUNCEMENT_LIST_START };
}

export function announcementListSuccess(announcements) {
  return { type: ANNOUNCEMENT_LIST_SUCCESS, announcements };
}

export function announcementListFailure(errors) {
  return { type: ANNOUNCEMENT_LIST_FAILURE, errors };
}

export function announcementList() {
  return (dispatch) => {
    dispatch(announcementListStart());

    if (!config.announcements_api_url) {
      const announcements = range(10).map(generateAnnouncement);
      return dispatch(announcementListSuccess(announcements));
    }

    return httpClient.get(config.announcements_api_url)
      .then(announcements => dispatch(announcementListSuccess(announcements)))
      .catch(errors => dispatch(announcementListFailure(errors)));
  };
}
