'use strict';

describe('Service: versionDataService', function () {

  // load the service's module
  beforeEach(module('cp2kInputEditorApp'));

  // instantiate service
  var versionDataService;
  beforeEach(inject(function (_versionDataService_) {
    versionDataService = _versionDataService_;
  }));

  it('should do something', function () {
    expect(!!versionDataService).toBe(true);
  });

});
