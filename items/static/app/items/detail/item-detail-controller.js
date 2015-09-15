(function() {
  'use strict';
  angular.module('dk').controller('ItemDetailCtrl', [
    '$http', '$state', '$stateParams', 'itemListSvc', 'itemSvc',

    function($http, $state, $stateParams, itemListSvc, itemSvc) {
      var vm = this;
      vm.loading = true;
      // the item whose details we are viewing
      vm.item = {};

      /**
       * Updates the details for the items we are currently previewing.
       */
      vm.updateDetailedItem = function() {
        itemListSvc.getItemById($stateParams.id)
          .then(function(res) {
            vm.item = res;
            vm.loading = false;
          });
      };

      /**
       * Deletes the current items.
       */
      vm.deleteItem = function() {
        if (confirm('Delete this item?')) {
          itemSvc.delete(vm.item)
            .then(function(res) {
              $state.go('dk.item_list', {forceUpdate: true});
            }, function(res) {
              // in case of error, display error and return to list state
              alert('There was an error when attempting to ' +
                'delete this items.\nStatus code: ' + res.status);
              $state.go('dk.item_list');
            });
        }
      };

      // init
      (function() {
        vm.updateDetailedItem();
      })();
    }]);
})();

