'use strict';

/**
 * @ngdoc directive
 * @name unleashApp.directive:unleashAchieve
 * @description
 * # Renders the button for toggling achieved state in the card
 */
angular.module('unleashApp')
  .directive('unleashAchieve', function (cardsService, slackService, zapierService) {
    return {
      link: function postLink(scope, element) {
        scope.slackNotification = false;
        scope.additionalMessage = '';

        var $button = angular.element(element.find('button'));

        var updateButton = function() {
          var newText = !scope.$parent.card.achieved ? 'Mark as achieved' : 'Mark as not achieved';

          $button.text(newText);
        };

        updateButton();

        scope.$watchCollection('card', function() {
          updateButton();
        });

        $button.on('click', function() {
          cardsService.toggleAchieved(scope.$parent.pathId, scope.$parent.card)
            .then(function() {
              if (scope.$parent.card.achieved) {
                if (scope.slackNotification) {
                  slackService.notifyAchieved({
                    cardOwner: scope.$parent.cardOwner,
                    currentUser: scope.$parent.currentUser,
                    card: scope.$parent.card,
                    pathId: scope.$parent.pathId,
                    additionalMessage: scope.additionalMessage
                  });
                }
                zapierService.postZapierNotification(scope.$parent.card, scope.$parent.cardOwner.fullName);
              }
            });
        });

      },
      scope: true,
      replace: true,
      templateUrl: 'views/partials/achieve.html'
    };
  });
