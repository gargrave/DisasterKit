(function() {
  'use strict';
  angular.module('dk').directive('itemWidget', [
    function() {
      return {
        restrict: 'AE',
        scope: {
          itemData: '=',
        },
        templateUrl: '/static/partials/item-widget.html'
      };
    }]);
})();
