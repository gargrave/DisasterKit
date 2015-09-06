(function() {
  'use strict';
  angular.module('dk').controller('ItemsController', ItemsController);
  ItemsController.$inject = ['$scope', '$http'];

  function MainController($scope, $http) {
    var vm = this;

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

