(function() {
  'use strict';
  angular.module('dk').controller('ItemUpdateController', ItemUpdateController);
  ItemUpdateController.$inject = ['$state', '$stateParams', 'itemListSvc'];

  function ItemUpdateController($state, $stateParams, itemListSvc) {
    var vm = this;
    // the item whose details we are viewing
    vm.item = {};

    /**
     * Updates the details for the item we are currently previewing.
     */
    vm.getTargetItem = function() {
      itemListSvc.getItemById($stateParams.id)
        .then(function(res) {
          vm.item = res;
        });
    };

    /**
     * Returns to the item details view for the current item.
     */
    vm.goToItemDetails = function() {
      $state.go('dk.item_detail', {'id': vm.item.id});
    };

    /**
     * Returns to the item kust view.
     */
    vm.goToItemList = function() {
      $state.go('dk.item_list');
    };

    /**
     * Sends the current changes to the item back to the server.
     */
    vm.commitUpdates = function() {
      alert('TODO: Save this update to the server!');
      vm.goToItemList();
    };

    // init
    (function() {
      vm.getTargetItem();
    })();
  }
})();
