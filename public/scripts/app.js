'use strict';

var sampleApp = angular.module('sampleApp', ['ui.bootstrap', 'ngResource', 'angularTreeview', 'pageslide-directive'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
        .when('/me/', {
            templateUrl: 'partials/me.html'
        })
      .otherwise({
        redirectTo: '/'
      });
  }]);


