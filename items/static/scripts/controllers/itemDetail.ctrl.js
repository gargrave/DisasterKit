(function() {
  'use strict';
  angular.module('dk').controller('ItemDetailController', ItemDetailController);
  ItemDetailController.$inject = ['$stateParams', 'itemListSvc'];

  function ItemDetailController($stateParams, itemListSvc) {
    var vm = this;
    // the item whose details we are viewing
    vm.item = {};

    vm.updateDetailedItem = function() {
      vm.item = itemListSvc.getItemById($stateParams.id);
    };
    vm.updateDetailedItem();
  }
})();

