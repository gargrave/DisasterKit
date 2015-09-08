(function() {
  'use strict';
  angular.module('dk').controller('ItemCreateController', ItemCreateController);
  ItemCreateController.$inject = ['$http', '$state', 'categoryListSvc'];

  function ItemCreateController($http, $state, categoryListSvc) {
    var vm = this;
    vm.loading = true;
    // the item being created
    vm.item = {};
    // the list of categories from the server
    vm.cats = [];
    // the list of sub-categories from the server
    vm.subcats = [];

    /**
     * Performs any necessary initializtion for this controller.
     */
    vm.load = function() {
      // get the list of categories and sub-categories for the <select>s
      categoryListSvc.getCategoryList()
        .then(function(res) {
          vm.cats = res.cats;
          vm.subcats = res.subcats;
          vm.loading = false;
        });
    };

    /**
     * Sends the to the server to be saved.
     */
    vm.saveNewItem = function() {
      // TODO: let's validate that something has actually been entered before sending this off
      $http.post('items/api/create_item/', vm.item)
        .then(function(res) {
          $state.go('dk.item_list');
        // in case of error, display error and return to item-list state
        }, function(res) {
          alert('There was an error when attempting to ' +
              'create this item.\nStatus code: ' + res.status);
          $state.go('dk.item_list');
        });
    };

    // init
    (function() {
      vm.load();
    })();
  }
})();
