(function() {
  'use strict';
  angular.module('dk').controller('ItemUpdateController', ItemUpdateController);
  ItemUpdateController.$inject = [
    '$http', '$state', '$stateParams', 'itemListSvc'];

  function ItemUpdateController($http, $state, $stateParams, itemListSvc) {
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
      // TODO: let's validate that something has actually changed before sending this off
      $http.post('items/api/update_item/', vm.item)
        .then(function(res) {
          $state.go('dk.item_list');
        // in case of error, display error and return to item-list state
        }, function(res) {
          alert('There was an error when attempting to ' +
              'update this item.\nStatus code: ' + res.status);
          $state.go('dk.item_list');
        });
    };

    // init
    (function() {
      vm.getTargetItem();
    })();
  }
})();
