(function() {
  'use strict';
  angular.module('dk').controller('ItemCreateCtrl', [
    '$scope', '$http', '$state', 'categoryListSvc', 'itemCreateSvc',

    function($scope, $http, $state, categoryListSvc, itemCreateSvc) {
      var vm = this;
      vm.loading = true;
      // the items being created
      vm.item = {};
      // the list of categories from the server
      vm.cats = [];
      // the list of sub-categories from the server
      vm.subcats = [];

      /**
       * Performs any necessary initializtion for this controller.
       */
      vm.load = function() {
        // get the list of categories and sub-categories for the <select>s
        categoryListSvc.query()
          .then(function(res) {
            vm.cats = res.cats;
            vm.subcats = res.subcats;
            // set default selections
            vm.item.cat = vm.cats[0];
            vm.item.subcat = vm.subcats[0];
            vm.loading = false;
          });
      };

      /**
       * Sends the to the server to be saved.
       */
      vm.saveNewItem = function() {
        $scope.submitted = false;
        // submit as normal if the form is validated
        if ($scope.createForm.$valid) {
          // make sure we do not pass a null 'notes' field
          vm.item.notes = vm.item.notes || '';
          itemCreateSvc.saveNewItem(vm.item, function() {
            $state.go('dk.item_list', {forceUpdate: true});
          });
        // otherwise, show form errors erorrs
        } else {
          $scope.createForm.submitted = true;
        }
      };

      // init
      (function() {
        vm.load();
      })();
    }]);
})();
