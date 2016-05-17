'use strict';

/**
 * @ngdoc overview
 * @name unleashApp
 * @description
 * # unleashApp
 *
 * Main module of the application.
 */
angular.module('unleashApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngTouch',
    'ngSanitize',
    'ngAria',
    'dndLists',
    'relativeDate',
    'angular-growl',
    'firebase',
    'firebase.utils',
    'google.api',
    '720kb.datepicker'
  ])

.config(function($sceDelegateProvider) {
    // Allow loading thumbnails from Google+ in directives
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://*.googleusercontent.com/**'
    ]);
  })

.config(function(growlProvider) {
    growlProvider.globalTimeToLive(3000);
    growlProvider.globalDisableCountDown(true);
    growlProvider.globalDisableCloseButton(true);
    growlProvider.globalInlineMessages(true);
  })

.run(function($rootScope, $route, googleapi, $location, userService, googleService) {
  var postLogInRoute;
  userService.list().then(function(users) {
    $rootScope.allUsers = users;
  });

  googleapi.load(function(auth2) {
    $rootScope.auth2 = auth2;

    $rootScope.auth2.isSignedIn.listen(function(signedIn) {
      if (signedIn) {
        userService.login(googleService.getCurrentUser())
          .then(function(user) {
            $rootScope.user = user;
            if (postLogInRoute) {
              $location.path(postLogInRoute);
              postLogInRoute = null;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        userService.logout();
      }
    });
  });

  $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
    if (!$rootScope.user && nextRoute.authenticate) {
      postLogInRoute = $location.path();
      $location.path('/');
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(newVal, oldVal) {
    if (oldVal !== newVal) {
      $rootScope.routeClassName = 'page-' + $route.current.className;
    }
  });
});
