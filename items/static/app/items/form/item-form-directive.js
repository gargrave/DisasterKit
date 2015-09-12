(function() {
  'use strict';
  angular.module('dk').directive('itemEntryForm', [
    function() {
      return {
        restrict: 'A',
        scope: {
          ctrl: '='
        },
        templateUrl: '/static/app/items/form/item-form.html'
      };
    }]);
})();
