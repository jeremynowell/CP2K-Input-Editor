'use strict';

describe('Service: cp2kInputTransformerService', function () {

  // load the service's module
  beforeEach(module('cp2kInputEditorApp'));

  // instantiate service
  var cp2kInputTransformerService;
  beforeEach(inject(function (_cp2kInputTransformerService_) {
    cp2kInputTransformerService = _cp2kInputTransformerService_;
  }));

  it('should do something', function () {
    expect(!!cp2kInputTransformerService).toBe(true);
  });

});
