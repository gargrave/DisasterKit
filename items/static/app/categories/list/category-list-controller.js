(function() {
  'use strict';
  angular.module('dk').controller('CategoryListCtrl', [
    '$http', '$stateParams', 'categoryListSvc',

    function($http, $stateParams, categoryListSvc) {
      var vm = this;
      vm.loading = true;
      vm.cats = [];
      vm.subcats = [];
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
       * Sends the specified new category to the server.
       */
      vm.addNewCategory = function() {
        var value = $('#input_name').val();
        vm.errors.duplicate = false;

        // check if the submission is a duplicate of an existing one
        if (_.contains(vm.cats, value)) {
          vm.errors.duplicate = true;
        } else {
          // TODO replace this with a modal
          if (confirm('Create new category "' + value + '"?')) {
            $http.post('items/api/create_category', {name: value})
              .then(function(res) {
                loadCategories(true);
              });
          }
        }
      };

      (function() {
        loadCategories(false);
      })();
    }]);
})();

