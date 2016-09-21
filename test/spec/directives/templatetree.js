'use strict';

describe('Directive: templateTree', function () {

  // load the directive's module
  beforeEach(module('cp2kInputEditorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<template-tree></template-tree>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the templateTree directive');
  }));
});
