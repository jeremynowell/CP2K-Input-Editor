'use strict';

describe('Service: tempssDataService', function () {

  // load the service's module
  beforeEach(module('cp2kInputEditorApp'));

  // instantiate service
  var tempssDataService;
  beforeEach(inject(function (_tempssDataService_) {
    tempssDataService = _tempssDataService_;
  }));

  it('should do something', function () {
    expect(!!tempssDataService).toBe(true);
  });

});
