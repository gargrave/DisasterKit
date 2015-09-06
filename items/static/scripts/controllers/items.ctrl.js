(function() {
  'use strict';
  angular.module('dk').controller('ItemsController', ItemsController);
  ItemsController.$inject = ['$scope', '$rootScope', '$state', 'itemListSvc'];

  function ItemsController($scope, $rootScope, $state, itemListSvc) {
    var vm = this;
    vm.items = null;

    /**
     * Changes to the item details state for the specified item.
     * @param {int} itemID - The id of the item to view.
     */
    vm.viewItemDetails = function(itemID) {
      $state.go('dk.item_detail', {'id': itemID});
    };

    // load the list of current items
    itemListSvc.getItemList(false).then(function(res) {
      vm.items = res;
    });
  }
})();

