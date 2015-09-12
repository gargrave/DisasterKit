(function() {
  'use strict';
  angular.module('dk').controller('CategoryListCtrl', [
    '$stateParams', 'categoryListSvc',

    function($stateParams, categoryListSvc) {
      var vm = this;
      vm.loading = true;
      vm.cats = [];
      vm.subcats = [];

      (function() {
        // get the list of categories and sub-categories for the <select>s
        categoryListSvc.getCategoryList()
          .then(function(res) {
            vm.cats = res.cats;
            vm.subcats = res.subcats;
            vm.loading = false;
          });
      })();
    }]);
})();

