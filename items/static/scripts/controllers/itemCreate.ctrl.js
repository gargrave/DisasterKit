(function() {
  'use strict';
  angular.module('dk').controller('ItemCreateController', ItemCreateController);
  ItemCreateController.$inject = ['$http', '$state', 'categoryListSvc'];

  function ItemCreateController($http, $state, categoryListSvc) {
    // the RE pattern for date validation; checks for 'YYYY-MM-DD' format
    var DATE_RE = /^20[1-2]\d-[0-1][0-9]-[0-3][0-9]$/i;
    var vm = this;
    vm.loading = true;
    // the item being created
    vm.item = {};
    // the list of categories from the server
    vm.cats = [];
    // the list of sub-categories from the server
    vm.subcats = [];
    // a collection of validation checks
    // we will use this to check if the form is ready to be submitted,
    // and also to display relevant error message
    vm.valid = {
      date: true
    };

    /**
     * Performs any necessary initializtion for this controller.
     */
    vm.load = function() {
      // get the list of categories and sub-categories for the <select>s
      categoryListSvc.getCategoryList()
        .then(function(res) {
          vm.cats = res.cats;
          vm.subcats = res.subcats;
          // set default selections
          vm.item.cat = vm.cats[0];
          vm.item.subcat = vm.subcats[0];
          vm.loading = false;
        });
    };

    /**
     * Sends the to the server to be saved.
     */
    vm.saveNewItem = function() {
      // validate all necessary data before proceeding
      vm.valid = {
        date: new RegExp(DATE_RE).test(vm.item.exp)
      };

      // if we are all valid, submit the request to the server
      if (vm.valid.date) {
        // make sure we do not pass a null 'notes' field
        vm.item.notes = vm.item.notes || '';
        $http.post('items/api/create_item/', vm.item)
          .then(function(res) {
            $state.go('dk.item_list');
          // in case of error, display error and return to item-list state
          }, function(res) {
            alert('There was an error when attempting to ' +
                'create this item.\nStatus code: ' + res.status);
            $state.go('dk.item_list');
          });
      }
    };

    // init
    (function() {
      vm.load();
    })();
  }
})();
