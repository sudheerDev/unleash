import _ from 'lodash';
import httpClient from '../services/httpClient';
import config from '../../config';

const notifyAchieved = (params) => {
  const { protocol, host } = window.location;
  const { goal, user, additionalMessage } = params;
  const profileLink = `${protocol}//${host}/profiles/${params.user.id}`;
  const completeGoalText = `*${user.fullName}* has completed a goal! :sparkles:\n${additionalMessage}`;

  const payload = {
    uid: `${user.id}-${goal.id}`,
    text: completeGoalText,
    attachments: [
      {
        color: 'good',
        fallback: completeGoalText,
        title: goal.name || '',
        title_link: profileLink,
        text: goal.description || '',
        fields: [
          {
            title: 'Level',
            value: goal.level || 'none',
            short: true,
          },
          {
            title: 'Comments',
            value: _.size(goal.comments) || '0',
            short: true,
          },
        ],
        thumb_url: user.picture,
      },
    ],
    user: 'general',
  };

  return httpClient.post(`${config.slack_bot_url}/notify`, payload);
};


export default {
  notifyAchieved,
};
