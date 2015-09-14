describe('Controller: ItemListCtrl', function() {
  'use strict';

  beforeEach(module('dk'));
  var ctrl;

  beforeEach(inject(function($controller) {
      ctrl = $controller('ItemListCtrl');
    })
  );

  // check loading state
  it('should initialize in loading state.', function() {
    expect(ctrl.loading).toBe(true);
  });

  // check default sorting order
  it('should order in by expiration date in descending order.', function() {
    expect(ctrl.ordering).toBe('-exp');
  });

  // check the ability to set the sorting order
  it('should set the sorting order to the supplied value.', function() {
    ctrl.setOrderBy('name');
    expect(ctrl.ordering).toBe('name');
  });

  // check that invalid order values are ignored
  it('should not update sorting order for invalid values.', function() {
    ctrl.setOrderBy('name');
    ctrl.setOrderBy('asdoiqewff');
    expect(ctrl.ordering).toBe('name');
  });

  // check that calling the existing sort order reverses it
  it('should reverse the sort order if the same value is called.', function() {
    ctrl.setOrderBy('name');
    ctrl.setOrderBy('name');
    expect(ctrl.ordering).toBe('-name');
    ctrl.setOrderBy('name');
    expect(ctrl.ordering).toBe('name');
  });
});
