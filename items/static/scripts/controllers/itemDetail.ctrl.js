(function() {
  'use strict';
  angular.module('dk').controller('ItemDetailController', ItemDetailController);
  ItemDetailController.$inject = ['$http', '$state', '$stateParams', 'itemListSvc'];

  function ItemDetailController($http, $state, $stateParams, itemListSvc) {
    var vm = this;
    // the item whose details we are viewing
    vm.item = {};

    /**
     * Updates the details for the item we are currently previewing.
     */
    vm.updateDetailedItem = function() {
      itemListSvc.getItemById($stateParams.id)
        .then(function(res) {
          vm.item = res;
        });
    };

    /**
     * Deletes the current item.
     */
    vm.deleteItem = function() {
      if (confirm('Delete this item?')) {
        $http.delete('items/api/delete_item/' + vm.item.id)
          .success(function(res) {
            $state.go('dk.item_list');
          });
      }
    };

    /**
     * Begins the process of editing the current item.
     */
    vm.onEditClick = function() {
      $state.go('dk.item_update', {'id': vm.item.id});
    };

    /**
     * Returns to the item kust view.
     */
    vm.goToItemList = function() {
      $state.go('dk.item_list');
    };

    // init
    (function() {
      vm.updateDetailedItem();
    })();
  }
})();

