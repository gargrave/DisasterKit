(function() {
  'use strict';
  angular.module('dk').controller('ItemDetailCtrl', [
    '$http', '$state', '$stateParams', 'itemListSvc',

    function($http, $state, $stateParams, itemListSvc) {
      var vm = this;
      vm.loading = true;
      // the item whose details we are viewing
      vm.item = {};

      /**
       * Updates the details for the item we are currently previewing.
       */
      vm.updateDetailedItem = function() {
        itemListSvc.getItemById($stateParams.id)
          .then(function(res) {
            vm.item = res;
            vm.loading = false;
          });
      };

      /**
       * Deletes the current item.
       */
      vm.deleteItem = function() {
        if (confirm('Delete this item?')) {
          $http.delete('items/api/delete_item/' + vm.item.id)
            .then(function(res) {
              $state.go('dk.item_list', {forceUpdate: true});
              // in case of error, display error and return to
              // item-list state
            }, function(res) {
              alert('There was an error when attempting to ' +
                'delete this item.\nStatus code: ' + res.status);
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

