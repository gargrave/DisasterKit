(function() {
  'use strict';
  angular.module('dk').controller('ItemListController', [
      '$state', 'itemListSvc',

      function($state, itemListSvc) {
        var vm = this;
        vm.loading = true;
        vm.items = null;

        /**
         * Changes to the item creation view.
         */
        vm.goToItemCreateView = function() {
          alert('TODO: Change to ItemCreate view!');
        };

        // load the list of current items
        itemListSvc.getItemList(true).then(function(res) {
          vm.items = res;
          vm.loading = false;
        });
      }
    ]
  );
})();

