(function() {
  'use strict';
  angular.module('dk').controller('ItemListController', ItemListController);
  ItemListController.$inject = ['$state', 'itemListSvc'];

  function ItemListController($state, itemListSvc) {
    var vm = this;
    vm.items = null;

    /**
     * Changes to the item details state for the specified item.
     *
     * @param {int} itemID - The id of the item to view.
     */
    vm.viewItemDetails = function(itemID) {
      $state.go('dk.item_detail', {'id': itemID});
    };

    /**
     * Changes to the item creation view.
     */
    vm.goToItemCreateView = function() {
      alert('TODO: Change to ItemCreate view!');
    };

    // load the list of current items
    itemListSvc.getItemList(true).then(function(res) {
      vm.items = res;
    });
  }
})();

