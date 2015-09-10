(function() {
  'use strict';
  angular.module('dk').controller('ItemCreateController', [
      '$scope', '$http', '$state', 'categoryListSvc',

      function($scope, $http, $state, categoryListSvc) {
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
          $scope.submitted = false;
          // submit as normal if the form is validated
          if ($scope.createForm.$valid) {
            // make sure we do not pass a null 'notes' field
            vm.item.notes = vm.item.notes || '';
            $http.post('items/api/create_item/', vm.item)
              .then(function(res) {
                $state.go('dk.item_list', {forceUpdate: true});
                // in case of server error, display error and return to item-list state
              }, function(res) {
                alert('There was an error when attempting to ' +
                  'create this item.\nStatus code: ' + res.status);
                $state.go('dk.item_list');
              });
            // otherwise, show form errors erorrs
          } else {
            $scope.createForm.submitted = true;
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
