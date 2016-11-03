'use strict';

/**
 * @ngdoc service
 * @name unleashApp.zapierService
 * @description
 * # zapierService
 * Methods related to Zapier
 */
angular.module('unleashApp')
  .factory('zapierService', function($http, $q, ZAPIER_WEBHOOK_URL) {

    return {
      postZapierNotification: function(card, userName) {
        var defer = $q.defer();

        $http.post(
          ZAPIER_WEBHOOK_URL,
          {
            achievement: {
              user: userName,
              message: userName + ': [' + card.name + '][lvl: ' + card.level + '] ' + card.description
            }
          },
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        ).then(function() {
          defer.resolve();
        }).catch(function() {
          console.error('There was a problem posting to Zapier.');
          defer.reject(new Error('There was a problem posting to Zapier.'));
        });

        return defer.promise;
      }
    };

  });
