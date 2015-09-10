(function() {
  'use strict';
  angular.module('dk').controller('ItemListController', [
      '$stateParams', 'itemListSvc',

      function($stateParams, itemListSvc) {
        var vm = this;
        // check the state params if we need to force a list update
        // (i.e. has an item been updated/added/deleted/etc.?)
        var forceListUpdate = $stateParams.forceUpdate || false;
        vm.loading = true;
        vm.items = null;

        // load the list of current items
        itemListSvc.getItemList(forceListUpdate).then(function(res) {
          vm.items = res;
          vm.loading = false;
        });
      }
    ]
  );
})();

