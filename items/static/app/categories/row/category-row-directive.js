(function() {
  'use strict';
  angular.module('dk').directive('categoryRow', [

    function() {
      return {
        restrict: 'A',
        scope: {
          cat: '='
        },
        templateUrl: '/static/app/categories/row/category-row.html'
      };
    }]);
})();
