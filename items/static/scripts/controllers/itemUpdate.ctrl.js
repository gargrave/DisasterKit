(function() {
  'use strict';
  angular.module('dk').controller('ItemUpdateController', ItemUpdateController);
  ItemUpdateController.$inject = ['$state', '$stateParams', 'itemListSvc'];

  function ItemUpdateController($state, $stateParams, itemListSvc) {
    var vm = this;
    vm.loading = true;
    // the item whose details we are viewing
    vm.item = {};

    /**
     * Updates the details for the item we are currently previewing.
     */
    vm.getTargetItem = function() {
      itemListSvc.getItemById($stateParams.id)
        .then(function(res) {
          vm.item = res;
          vm.loading = false;
        });
    };

    /**
     * Sends the current changes to the item back to the server.
     */
    vm.commitUpdates = function() {
      alert('TODO: Save this update to the server!');
      $state.go('dk.item_list');
    };

    // init
    (function() {
      vm.getTargetItem();
    })();
  }
})();
