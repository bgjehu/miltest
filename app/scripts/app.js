'use strict';

/**
 * @ngdoc overview
 * @name miltestApp
 * @description
 * # miltestApp
 *
 * Main module of the application.
 */
angular
  .module('miltestApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/rank-test', {
        templateUrl: 'views/rank-test.html',
        controller: 'RankTestCtrl',
        controllerAs: 'rankTest'
      })
      .when('/phonetic-test', {
        templateUrl: 'views/phonetic-test.html',
        controller: 'PhoneticTestCtrl',
        controllerAs: 'phoneticTest'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
