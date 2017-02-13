import _ from 'lodash';
import fetchHelper from '../helpers/fetchHelper';
import config from '../../config';

const notify = (slackPayload) => {
  const options = fetchHelper.postOptions(slackPayload);

  return fetch(`${config.slack_bot_url}/notify`, options).then((response) => response.text());
};

const notifyAchieved = (parameters) => {
  const profileLink = `${window.location.protocol}//${window.location.host}/profiles/${parameters.user.id}`; // eslint-disable-line
  const completeGoalText = `*${parameters.user.fullName}* has completed a goal! :sparkles:\n${parameters.additionalMessage}`; //eslint-disable-line

  const payload = {
    uid: `${parameters.user.id}-${parameters.goal.id}`,
    text: completeGoalText,
    attachments: [
      {
        color: 'good',
        fallback: completeGoalText,
        title: parameters.goal.name || '',
        title_link: profileLink,
        text: parameters.goal.description || '',
        fields: [
          {
            title: 'Level',
            value: parameters.goal.level || 'none',
            short: true
          },
          {
            title: 'Comments',
            value: _.size(parameters.goal.comments) || '0',
            short: true
          }
        ],
        thumb_url: parameters.user.picture
      }
    ],
    user: 'general',
  };

  return notify(payload);
};


export default {
  notifyAchieved,
};