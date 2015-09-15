describe('Controller: CategoryListCtrl', function() {
  'use strict';

  beforeEach(module('dk'));
  var ctrl;

  beforeEach(inject(function($controller) {
      ctrl = $controller('CategoryListCtrl');
    })
  );

  // check loading state
  it('should have default values at start.', function() {
    expect(ctrl.loading).toBe(true);
    expect(ctrl.cats.length).toBe(0);
    expect(ctrl.subcats.length).toBe(0);
  });

  // check resetting values
  it('should reset the value of the new category name.', function() {
    ctrl.errors.duplicate = true;
    ctrl.newCategory = 'NewCategory';
    ctrl.clearCategoryInput();
    expect(ctrl.errors.duplicate).toBeFalsy();
    expect(ctrl.newCategory).toBe('');
  });

  // check that we are correctly detecting duplicates
  it('should detect existing value from new category input.', function() {
    ctrl.cats = [{id: 0, name: 'Food'}];
    ctrl.errors.duplicate = false;
    ctrl.newCategory = 'Food';
    ctrl.newCatKeyUp();
    expect(ctrl.errors.duplicate).toBeTruthy();
  });
});
