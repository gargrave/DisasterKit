(function() {
  'use strict';
  angular.module('dk').service('itemSvc',
    ['$http', '$q',

      function($http, $q) {
        var API_URL_GETPOST = 'items/api/item/';
        var vm = this;

        /**
       * Sends a POST request with the specified item to the server.
       * Returns the Promise objects from the query.
       *
       * @param {Object} item - The new item to create.
       * @returns {HttpPromise}
       */
        vm.create = function(item) {
          return $http.post(API_URL_GETPOST, item);
        };
      }
    ]
  );
})();
