'use strict';

describe('Service: treeAccessor', function () {

  // load the service's module
  beforeEach(module('cp2kInputEditorApp'));

  // instantiate service
  var treeAccessor;
  beforeEach(inject(function (_treeAccessor_) {
    treeAccessor = _treeAccessor_;
  }));

  it('should do something', function () {
    expect(!!treeAccessor).toBe(true);
  });

});
