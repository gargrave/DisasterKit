(function() {
  'use strict';
  angular.module('dk').controller('ItemCreateCtrl', [
    '$scope', '$state', 'categorySvc', 'itemSvc',

    function($scope, $state, categorySvc, itemSvc) {
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
        categorySvc.query()
          .then(function(res) {
            vm.cats = res.cats;
            vm.subcats = res.subcats;
            // set default selections
            vm.item.cat = vm.cats[0].name;
            vm.item.subcat = vm.subcats[0].name;
            vm.loading = false;
          });
      };

      /**
       * Sends the new item data to the server to be saved.
       */
      vm.saveNewItem = function() {
        $scope.submitted = false;
        // submit as normal if the form is validated
        if (vm.canSaveNewItem()) {
          // make sure we do not pass a null 'notes' field
          vm.item.notes = vm.item.notes || '';
          itemSvc.create(vm.item)
            .then(function(res) {
              $state.go('dk.item_list', {forceUpdate: true});
            }, function(res) {
              alert('The new item could not be created.' +
                '\nStatus code: ' + res.status);
              $state.go('dk.item_list', {forceUpdate: true});
            });
        // otherwise, show form errors erorrs
        } else {
          $scope.createForm.submitted = true;
        }
      };

      /**
       * Returns whether the new Item is valid and can be saved.
       *
       * @returns {Boolean} - Whether we can save the current Item info.
       */
      vm.canSaveNewItem = function() {
        return $scope.createForm.$valid;
      };

      // init
      (function() {
        vm.load();
      })();
    }]);
})();
