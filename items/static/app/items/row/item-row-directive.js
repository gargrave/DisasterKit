(function() {
  'use strict';
  angular.module('dk').directive('itemWidget', [

    function() {
      return {
        restrict: 'A',
        scope: {
          itemData: '='
        },
        templateUrl: '/static/app/items/row/item-row.html'
      };
    }]);
})();
