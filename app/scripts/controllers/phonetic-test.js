'use strict';

/**
 * @ngdoc function
 * @name miltestApp.controller:PhoneticTestCtrl
 * @description
 * # PhoneticTestCtrl
 * Controller of the miltestApp
 */
angular.module('miltestApp')
  .controller('PhoneticTestCtrl', function ($scope, $http, $moment, $filter, $timeout, $location) {

    // Returns a random integer between min (included) and max (included)
    // Using Math.round() will give you a non-uniform distribution!
    var port = $location.port();
    var phoneticJsonFile = $location.protocol() + '://' + $location.host();
    phoneticJsonFile = port===null ? phoneticJsonFile : phoneticJsonFile + ':' + port;
    phoneticJsonFile += '/resources/phonetic.json';

    function getRandomIntInclusive(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getTestNumbers(){
      var length = $scope.phonetics.length;
      var testNumbers = [];
      for(var i=0;i<length;i++){
        var randNum = getRandomIntInclusive(0,length-1);
        while(testNumbers.indexOf(randNum)!==-1){
          randNum = getRandomIntInclusive(0,length-1);
        }
        testNumbers.push(randNum);
      }
      return testNumbers;
    }

    function isAnswerCorrect(){
      return $filter('uppercase')($scope.answer)===$filter('uppercase')($scope.phonetics[$scope.testNumbers[$scope.currentNumber]].word);
    }
    function tick(){
      $scope.usedTime = getUsedTime();
      $scope.countDown = $timeout(tick, $scope.tickInterval);
    }
    function getUsedTime(){
      var timespan = $moment.now() - $scope.startTime;
      return $moment(timespan).format('mm:ss');
    }

    function init(){
      $scope.tickInterval = 1000; //ms
      $scope.answer = null;
      $scope.previous = null;
      $scope.testResutls = [];
      $scope.phonetics = {};
      $scope.testNumbers = [];
      $scope.currentNumber = 0;
      $scope.startTime = $moment.now();
      $scope.usedTime = null;
      $scope.countDown = $timeout(tick, $scope.tickInterval);
    }


    init();

    $scope.isFinished = function(){
      return $scope.currentNumber===$scope.phonetics.length && $scope.previous!==null;
    };

    $scope.submit = function(){
      $scope.previous = $scope.phonetics[$scope.testNumbers[$scope.currentNumber]];
      $scope.previous.answer = $filter('uppercase')($scope.answer);
      $scope.previous.correctness = isAnswerCorrect();
      $scope.testResutls.push($scope.previous);
      $scope.currentNumber = $scope.currentNumber + 1;
      $scope.answer = null;
      if($scope.isFinished()){
        $timeout.cancel($scope.countDown);
      }
    };

    $scope.reset = function(){
      $scope.answer = null;
      $scope.previous = null;
      $scope.testResutls = [];
      $scope.testNumbers = getTestNumbers();
      $scope.currentNumber = 0;
      $scope.startTime = $moment.now();
      $scope.usedTime = null;
      $scope.countDown = $timeout(tick, $scope.tickInterval);
    };

    $http.get(phoneticJsonFile)
      .success(function(data){
        $scope.phonetics = data;
        $scope.testNumbers = getTestNumbers();
      })
      .error(function(err){
        console.log(err);
      });
  });
