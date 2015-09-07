(function() {
  'use strict';
  angular.module('dk').controller('ItemDetailController', ItemDetailController);
  ItemDetailController.$inject = [
    '$http', '$state', '$stateParams', 'itemListSvc'];

  function ItemDetailController($http, $state, $stateParams, itemListSvc) {
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
        }, function(res) {
          alert('There was an error when attempting to fetch item details.');
        });
    };

    /**
     * Deletes the current item.
     */
    vm.deleteItem = function() {
      if (confirm('Delete this item?')) {
        $http.delete('items/api/delete_item/' + vm.item.id)
          .then(function(res) {
            $state.go('dk.item_list');
          }, function(res) {
            alert('There was an error when attempting to delete this item.');
            $state.go('dk.item_list');
          });
      }
    };

    // init
    (function() {
      vm.updateDetailedItem();
    })();
  }
})();

