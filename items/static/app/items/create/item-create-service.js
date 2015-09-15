(function() {
  'use strict';
  angular.module('dk').service('itemCreateSvc',
    ['$http',

      function($http) {
        var URL_CREATE_ITEM = 'items/api/create_item/';
        var vm = this;

        vm.saveNewItem = function(item, callback) {
          $http.post(URL_CREATE_ITEM, item)
            .then(function(res) {
              if (callback) {
                callback();
              }
            // in case of server error, display error and return to list state
            }, function(res) {
              alert('There was an error when attempting to ' +
                'create this items.\nStatus code: ' + res.status);
              $state.go('dk.item_list');
            });
        };
      }]);
})();
