(function() {
  'use strict';
  angular.module('dk').controller('CategoryListCtrl', [
    '$http', '$stateParams', 'categoryListSvc', 'categoryUpdateSvc',

    function($http, $stateParams, categoryListSvc, categoryUpdateSvc) {
      var vm = this;
      vm.loading = true;
      vm.cats = [];
      vm.subcats = [];
      vm.edit = {
        id: -1,
        name: ''
      };
      vm.editOriginalName = '';
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
        vm.errors.duplicate = false;
        _.each(vm.cats, function(element) {
          if (element.name === vm.newCategory) {
            return vm.errors.duplicate = true;
          }
        });
      };

      /**
       * Clears the current value of the new category model and
       * resets error messages.
       */
      vm.clearCategoryInput = function() {
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
                vm.clearCategoryInput();
                loadCategories(true);
              });
          }
        }
      };

      vm.enableEditing = function(catID) {
        vm.edit.id = -1;
        _.each(vm.cats, function(element) {
          if (element.id === catID) {
            vm.edit.name = element.name;
            vm.editOriginalName = vm.edit.name;
            return vm.edit.id = catID;
          }
        });
      };

      vm.saveEdits = function() {
        if (vm.canSaveEdits()) {
          categoryUpdateSvc.saveEdits(vm.edit, function() {
            vm.cancelEditing();
            loadCategories(true);
          });
        }
      };

      /**
       * Cancels the category editing process and resets all necessary values
       */
      vm.cancelEditing = function() {
        vm.edit.id = -1;
      };

      /**
       * Returns whether the specified ID is the one currently set for editing.
       *
       * @param {Number} catID - The ID to check.
       * @returns {Boolean} - Whether the specified ID is the one being edited.
       */
      vm.isEditing = function(catID) {
        return vm.edit.id !== -1 && catID === vm.edit.id;
      };

      /**
       * Returns whether the current state of edits meets the requirements
       * to be saved.
       *
       * @returns {Boolean} - Whether we can save the current edits.
       */
      vm.canSaveEdits = function() {
        return vm.edit.name !== '' &&
          vm.edit.name !== vm.editOriginalName;
      };

      /**
       * Sends the request to the server to delete the specified category.
       */
      vm.deleteCategory = function(cat) {
        if (confirm('Delete category "' + cat.name + '"?')) {
          $http.post('items/api/delete_category', {pk: cat.id})
            .then(function(res) {
              loadCategories(true);
            });
        }
      };

      (function() {
        loadCategories(false);
      })();
    }]);
})();

