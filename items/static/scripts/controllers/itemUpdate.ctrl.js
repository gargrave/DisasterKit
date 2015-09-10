(function() {
  'use strict';
  angular.module('dk').controller('ItemUpdateController', [
      '$http', '$state', '$stateParams', 'itemListSvc', 'categoryListSvc',

      function($http, $state, $stateParams, itemListSvc, categoryListSvc) {
        // the RE pattern for date validation; checks for 'YYYY-MM-DD' format
        var DATE_RE = /^20[1-2]\d-[0-1][0-9]-[0-3][0-9]$/i;
        var vm = this;
        vm.loading = true;
        // the item whose details we are viewing
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
         * Checks if all necessary values have been loaded, and sets the
         * 'loading' flag to false once they have.
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
          // TODO: check that any values have actually changed before submitting this

          // validate all necessary data before proceeding
          vm.valid = {
            date: new RegExp(DATE_RE).test(vm.item.exp)
          };

          // if we are all valid, submit the request to the server
          if (vm.valid.date) {
            $http.post('items/api/update_item/', vm.item)
              .then(function(res) {
                $state.go('dk.item_list');
                // in case of error, display error and return to item-list state
              }, function(res) {
                alert('There was an error when attempting to ' +
                  'update this item.\nStatus code: ' + res.status);
                $state.go('dk.item_list');
              });
          }
        };

        // init
        (function() {
          vm.load();
        })();
      }
    ]
  );
})();
