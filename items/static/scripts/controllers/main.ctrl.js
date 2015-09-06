(function() {
  'use strict';
  angular.module('dk').controller('MainController', MainController);
  MainController.$inject = ['$scope', '$http'];

  function MainController($scope, $http) {
    var vm = this;
    vm.editing = false;
    vm.editButtonLabel = 'Edit';

    vm.edits = {
      name: 'TODO: Finish editing for name.',
      count: 'TODO: Finish editing for count.',
      expiration: 'TODO: Finish editing for expiration.',
      notes: 'TODO: Finish editing for notes.'
    };

    vm.onEditClick = function(itemID) {
      if (vm.editing) {
        vm.commitEdits(itemID);
      } else {
        vm.startEditing();
      }
    };

    vm.commitEdits = function(itemID) {
      if (confirm('Save these edits?')) {
        $http.post('/items/update/' + itemID, {
          name: 'fartname'
        }).then(function(res) {
          console.log(res.data);
          if (res.data == 'ok') {
            window.location = '/items/';
          }
        });
      }
    };

    vm.startEditing = function() {
      vm.editing = true;
      vm.editButtonLabel = 'Save';
    };

    vm.stopEditing = function() {
      vm.editing = false;
      vm.editButtonLabel = 'Edit';
    };

    /**
     * Deletes an item from the databse.
     * @param itemID {int} - The ID of the item to delete.
     */
    vm.deleteItem = function(itemID) {
      // TODO: Replace this with a modal dialog.
      // TODO: let's ultimately replace this with an AJAX call
      if (confirm('Delte this item?')) {
        window.location = '/items/delete/' + itemID;
      }
    }
  }
})();

