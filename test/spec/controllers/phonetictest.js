'use strict';

describe('Controller: PhonetictestCtrl', function () {

  // load the controller's module
  beforeEach(module('miltestApp'));

  var PhonetictestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PhonetictestCtrl = $controller('PhonetictestCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PhonetictestCtrl.awesomeThings.length).toBe(3);
  });
});
