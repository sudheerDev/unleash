(function() {
  'use strict';

  // Mandrill API Url
  var MANDRILL_URL = 'https://mandrillapp.com/api/1.0/messages/send.json';
  // Mandrill API Key (Env variable to be replaced by grunt)
  var MANDRILL_API_KEY = '@@MANDRILL_KEY';

  var BOT_URL = '@@BOT_URL';
  var SKILLS_URL = '@@SKILLS_URL';
  var GOALS_URL = '@@GOALS_URL';
  var PATHS_URL = '@@PATHS_URL';
  var PROFILES_URL = '@@PROFILES_URL';
  var TRAVIS_BUILD_NUMBER = '@@TRAVIS_BUILD_NUMBER';
  var MIXPANEL_ANALYTICS_ENABLED = '@@MIXPANEL_ANALYTICS_ENABLED';
  var DEFAULT_PICTURE_URL = '@@DEFAULT_PICTURE_URL';
  var ZAPIER_WEBHOOK_URL = '@@ZAPIER_WEBHOOK_URL';

  angular
    .module('unleashApp')
    .constant('dataPath', 'scripts/data/')
    .constant('SKILLS_API_URL', SKILLS_URL)
    .constant('GOALS_API_URL', GOALS_URL)
    .constant('PATHS_API_URL', PATHS_URL)
    .constant('PROFILES_API_URL', PROFILES_URL)
    .constant('BUILD_NUMBER', TRAVIS_BUILD_NUMBER)
    .constant('ANALYTICS_ENABLED', MIXPANEL_ANALYTICS_ENABLED === 'true')
    .constant('MAIL_CONFIG', { url: MANDRILL_URL, key: MANDRILL_API_KEY })
    .constant('SLACK_CONFIG', { botUrl: BOT_URL })
    .constant('DEFAULT_PICTURE_URL', DEFAULT_PICTURE_URL)
    .constant('ZAPIER_WEBHOOK_URL', ZAPIER_WEBHOOK_URL);
})();
