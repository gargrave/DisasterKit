(function() {
  'use strict';
  angular.module('dk').controller('CategoryListCtrl', [
    '$http', '$stateParams', 'categoryListSvc',

    function($http, $stateParams, categoryListSvc) {
      var vm = this;
      vm.loading = true;
      vm.cats = [];
      vm.subcats = [];
      // the model for the new category name
      vm.newCategory = '';
      // collection of error objects
      vm.errors = {
        duplicate: false
      };

      /**
       * Queries the server for the current list of categories/sub-categories.
       */
      function loadCategories(force) {
        vm.loading = true;
        categoryListSvc.getCategoryList(force)
          .then(function(res) {
            vm.cats = res.cats;
            vm.subcats = res.subcats;
            vm.loading = false;
          });
      }

      /**
       * Checks if the current value of the new category name
       * is a duplicate of an existing one.
       */
      vm.newCatKeyUp = function() {
        vm.errors.duplicate = _.contains(vm.cats, vm.newCategory);
      };

      /**
       * Clears the current value of the new category model and
       * resets error messages.
       */
      vm.clearNewCategory = function() {
        vm.newCategory = '';
        vm.errors.duplicate = false;
      };

      /**
       * Sends the specified new category to the server.
       */
      vm.addNewCategory = function() {
        if (!vm.errors.duplicate) {
          // TODO replace this with a modal
          if (confirm('Create new category "' + vm.newCategory + '"?')) {
            $http.post('items/api/create_category', {name: vm.newCategory})
              .then(function(res) {
                loadCategories(true);
              });
          }
        }
      };

      /**
       * Sends the request to the server to delete the specified category.
       */
      vm.deleteCategory = function() {

      };

      (function() {
        loadCategories(false);
      })();
    }]);
})();

