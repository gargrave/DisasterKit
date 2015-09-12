describe('Controller: ItemListCtrl', function() {
  'use strict';

  beforeEach(module('dk'));
  var ctrl;

  beforeEach(inject(function($controller) {
      ctrl = $controller('ItemListCtrl');
    })
  );

  it('should initialize in loading state.', function() {
    expect(ctrl.loading).toBe(true);
  });
});
