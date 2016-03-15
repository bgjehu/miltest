'use strict';

/**
 * @ngdoc function
 * @name miltestApp.controller:NaviBarCtrl
 * @description
 * # NaviBarCtrl
 * Controller of the miltestApp
 */
angular.module('miltestApp')
  .controller('NaviBarCtrl', function ($scope, $location) {
    $scope.isActive = function(path){
      return path === $location.path();
    };
  });
