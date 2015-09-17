(function() {
  'use strict';
  angular.module('dk').service('itemSvc', [
    '$http', '$q',

    function($http, $q) {
      var API_URL_GETPOST = 'items/api/item/';
      var API_URL_UPDATE = 'items/api/item/update/';
      var API_URL_DELETE = 'items/api/item/delete/';
      var vm = this;
      var items = [];

      /**
       * Queries the API for a full list of active items.
       *
       * @param {bool} forceUpdate - Whether an update should be forced (i.e.
       *    even if the model has already been filled).
       */
      vm.query = function(forceUpdate) {
        var deferred = $q.defer();
        var force = forceUpdate || false;

        if (items.length > 0 && !force) {
          deferred.resolve(items);
        } else {
          $http.get(API_URL_GETPOST)
            .then(function(res) {
              items = [];
              var jsonItems = res.data.items;
              for (var i in jsonItems) {
                if (jsonItems.hasOwnProperty(i)) {
                  items.push(jsonItems[i]);
                }
              }
              deferred.resolve(items);
              // in case of error response, display error and return to home state
            }, function(res) {
              alert('There was an error getting the items ' +
                'list from the server.\nStatus code: ' + res.status);
            });
        }
        return deferred.promise;
      };

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

      /**
       * Sends a POST request with the specified item to the server
       * to be updated. Returns the Promise object from the query.
       *
       * @param {Object} item - The item details to update.
       * @returns {HttpPromise}
       */
      vm.update = function(item) {
        return $http.post(API_URL_UPDATE, item);
      };

      /**
       * Sends the request to the server to delete the specified item.
       *
       * @param {Object} item - The Item to be deleted.
       */
      vm.delete = function(item) {
        return $http.post(API_URL_DELETE, {
          id: item.id
        });
      };
    }
  ]);
})();
