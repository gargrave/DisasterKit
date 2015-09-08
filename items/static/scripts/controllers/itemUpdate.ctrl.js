(function() {
  'use strict';
  angular.module('dk').controller('ItemUpdateController', ItemUpdateController);
  ItemUpdateController.$inject = [
    '$http', '$state', '$stateParams', 'itemListSvc', 'categoryListSvc'];

  function ItemUpdateController($http, $state, $stateParams,
                                itemListSvc, categoryListSvc) {
    var vm = this;
    vm.loading = true;
    // the item whose details we are viewing
    vm.item = {};
    // the list of categories from the server
    vm.cats = [];
    // the list of sub-categories from the server
    vm.subcats = [];

    /**
     * Checks if all necessary values have been loaded, and sets the 'loading'
     * flag to false once they have.
     */
    function updateLoadingStatus() {
      if (vm.item.id &&
          vm.cats.length > 0 &&
          vm.subcats.length > 0) {
        vm.loading = false;
      }
    }

    /**
     * Performs any necessary initializtion for this controller.
     */
    vm.load = function() {
      // get the details for the current item
      itemListSvc.getItemById($stateParams.id)
        .then(function(res) {
          vm.item = res;
          updateLoadingStatus();
        });

      // get the list of categories and sub-categories for the <select>s
      categoryListSvc.getCategoryList()
        .then(function(res) {
          vm.cats = res.cats;
          vm.subcats = res.subcats;
          updateLoadingStatus();
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
      vm.load();
    })();
  }
})();
