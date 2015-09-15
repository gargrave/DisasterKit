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

  it('should enable editing for the specified ID.', function() {
    ctrl.cats = [{id: 0, name: 'Food'}];
    ctrl.enableEditing(0);
    expect(ctrl.edit.id).toEqual(0);
    expect(ctrl.edit.name).toEqual(ctrl.cats[0].name);
  });

  it('should reset to default value for invalid editing ID.', function() {
    ctrl.cats = [{id: 0, name: 'Food'}];
    ctrl.enableEditing(0);
    ctrl.enableEditing(-100);
    expect(ctrl.edit.id).toEqual(-1);
  });

  it('should indicate if the ID is enabled for editing.', function() {
    ctrl.cats = [{id: 0, name: 'Food'}];
    ctrl.enableEditing(0);
    expect(ctrl.isEditing(0)).toBeTruthy();
  });

  it('should reset the value when editing is cancelled.', function() {
    ctrl.cats = [{id: 0, name: 'Food'}];
    ctrl.enableEditing(0);
    ctrl.cancelEditing();
    expect(ctrl.edit.id).toBe(-1);
  });
});
