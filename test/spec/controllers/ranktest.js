'use strict';

describe('Controller: RanktestCtrl', function () {

  // load the controller's module
  beforeEach(module('miltestApp'));

  var RanktestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RanktestCtrl = $controller('RanktestCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RanktestCtrl.awesomeThings.length).toBe(3);
  });
});
