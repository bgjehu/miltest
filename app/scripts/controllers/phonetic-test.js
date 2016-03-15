'use strict';

/**
 * @ngdoc function
 * @name miltestApp.controller:PhoneticTestCtrl
 * @description
 * # PhoneticTestCtrl
 * Controller of the miltestApp
 */
angular.module('miltestApp')
  .controller('PhoneticTestCtrl', function ($scope, $http) {

    // Returns a random integer between min (included) and max (included)
    // Using Math.round() will give you a non-uniform distribution!

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

    // function isAnswerCorrect(){
    //   return $scope.answer.lowercase() === $scope.phonetics[$scope.testNumbers[$scope.currentNumber]].word.lowercase();
    // }

    function init(){
      $scope.answer = null;
      $scope.previous = null;
      $scope.testResutls = [];
      $scope.phonetics = {};
      $scope.testNumbers = [];
      $scope.currentNumber = 0;
    }

    init();

    $scope.isFinished = function(){
      return $scope.currentNumber===$scope.phonetics.length && $scope.previous!==null;
    };

    $scope.submit = function(){
      $scope.previous = $scope.phonetics[$scope.testNumbers[$scope.currentNumber]];
      // $scope.previousAnswer = $scope.answer.uppercase();
      // $scope.previousResult = isAnswerCorrect();
      $scope.previous.answer = $scope.answer;
      $scope.previous.correctness = $scope.answer === $scope.phonetics[$scope.testNumbers[$scope.currentNumber]].word;
      $scope.testResutls.push($scope.previous);
      $scope.currentNumber = $scope.currentNumber + 1;
      $scope.answer = null;
    };

    $scope.reset = init;

    $http.get('./../../resources/phonetic.json')
      .success(function(data){
        $scope.phonetics = data;
        $scope.testNumbers = getTestNumbers();
      })
      .error(function(err){
        console.log(err);
      });
  });
