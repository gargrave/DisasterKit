(function() {
  'use strict';
  angular.module('dk').controller('CategoryListCtrl', [
    '$stateParams', 'categorySvc',

    function($stateParams, categorySvc) {
      var vm = this;
      vm.loading = true;
      // list of all categories
      vm.cats = [];
      // list of all sub-categories
      vm.subcats = [];
      // the category object to use for tracking/submitting edits
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
        categorySvc.query(force)
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

      /*========================================
       * Category Creation Methods
       *========================================*/

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
      vm.saveNewCategory = function() {
        if (vm.canSaveNewCategory()) {
          categorySvc.create({name: vm.newCategory})
            .then(function(res) {
              vm.clearCategoryInput();
              loadCategories(true);
            });
        }
      };

      /**
       * Returns whether the new category can currently be saved as-is.
       * Requires it to not be blank and not be a duplicate.
       */
      vm.canSaveNewCategory = function() {
        return vm.newCategory !== '' && !vm.errors.duplicate;
      };

      /*========================================
       * Category Editing Methods
       *========================================*/

      /**
       * Enables the category with the specified ID to be editied.
       *
       * @param {Number} catID - The ID for category to begin editing.
       */
      vm.enableEditing = function(catID) {
        // set the default value to -1; if we receive an invalid ID,
        // it will stay at -1, and no category will be enabled for editing
        vm.edit.id = -1;
        // find the category with the specified ID and enabled it for editing
        // save the original value so we can compare for changes before saving
        _.each(vm.cats, function(element) {
          if (element.id === catID) {
            vm.edit.name = element.name;
            vm.editOriginalName = vm.edit.name;
            return vm.edit.id = catID;
          }
        });
      };

      /**
       * Saves the current edits on the active category.
       */
      vm.saveEdits = function() {
        if (vm.canSaveEdits()) {
          categorySvc.update(vm.edit)
            .then(function(res) {
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

      /*========================================
       * Category Deletion Methods
       *========================================*/

      /**
       * Sends the request to the server to delete the specified category.
       */
      vm.deleteCategory = function(category) {
        if (confirm('Delete category "' + category.name + '"?')) {
          categorySvc.delete(category)
            .then(function(res) {
              loadCategories(true);
            }, function(res) {
              alert('The category could not be deleted.' +
                '\nStatus code: ' + res.status);
            });
        }
      };

      /*========================================
       * Initialization
       *========================================*/
      (function() {
        loadCategories(false);
      })();
    }]);
})();

