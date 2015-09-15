(function() {
  'use strict';
  angular.module('dk').controller('ItemUpdateCtrl', [
    '$scope', '$http', '$state', '$stateParams',
    'itemListSvc', 'categorySvc', 'itemSvc',

    function($scope, $http, $state, $stateParams,
             itemListSvc, categorySvc, itemSvc) {
      var vm = this;
      vm.loading = true;
      // the items whose details we are viewing
      vm.item = {};
      // the list of categories from the server
      vm.cats = [];
      // the list of sub-categories from the server
      vm.subcats = [];

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
        // get the details for the current items
        itemListSvc.getItemById($stateParams.id)
          .then(function(res) {
            vm.item = res;
            updateLoadingStatus();
          });

        // get the list of categories and sub-categories for the <select>s
        categorySvc.query()
          .then(function(res) {
            vm.cats = res.cats;
            vm.subcats = res.subcats;
            updateLoadingStatus();
          });
      };

      /**
       * Sends the current changes to the items back to the server.
       */
      vm.saveEdits = function() {
        // if we are all valid, submit the request to the server
        $scope.submitted = false;
        // submit as normal if the form is validated
        if (vm.canSaveEdits()) {
          itemSvc.update(vm.item)
            .then(function(res) {
              $state.go('dk.item_list', {forceUpdate: true});
            }, function(res) {
              alert('There was an error when attempting to ' +
                'update the item.\nStatus code: ' + res.status);
              $state.go('dk.item_list');
            });
        // otherwise, show form errors erorrs
        } else {
          $scope.updateForm.submitted = true;
        }
      };

      /**
       * Returns whether the current state of edits meets the requirements
       * to be saved.
       *
       * @returns {Boolean} - Whether we can save the current edits.
       */
      vm.canSaveEdits = function() {
        // TODO: check that any values have actually changed before submitting this
        return $scope.updateForm.$valid;
      };

      // init
      (function() {
        vm.load();
      })();
    }]);
})();
