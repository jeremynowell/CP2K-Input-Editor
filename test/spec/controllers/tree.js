'use strict';

describe('Controller: TreectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('cp2kInputEditorApp'));

  var TreectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TreectrlCtrl = $controller('TreectrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TreectrlCtrl.awesomeThings.length).toBe(3);
  });
});
