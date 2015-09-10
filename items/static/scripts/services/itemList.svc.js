(function() {
  'use strict';
  angular.module('dk').service('itemListSvc', [
      '$http', '$q', '$state',

      function($http, $q, $state) {
        var vm = this;
        var items = [];

        /**
         * Queries the API for a full list of active items.
         *
         * @param {bool} forceUpdate - Whether an update should be forced (i.e.
         *    even if the model has already been filled).
         */
        vm.getItemList = function(forceUpdate) {
          var deferred = $q.defer();
          var force = forceUpdate || false;

          if (items.length > 0 && !force) {
            deferred.resolve(items);
          } else {
            $http.get('items/api/get_all_items')
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
                alert('There was an error getting the item ' +
                  'list from the server.\nStatus code: ' + res.status);
                $state.go('dk.home');
              });
          }
          return deferred.promise;
        };

        /**
         * Returns an invidual item instance matching the specified ID.
         *
         * @param {int} targetID - The ID of the item to find.
         */
        vm.getItemById = function(targetID) {
          var deferred = $q.defer();
          $http.get('items/api/get_item_by_id/' + targetID)
            .then(function(res) {
              deferred.resolve(res.data);
              // in case of error response, display error and return to item-list state
            }, function(res) {
              // for 404s, just redirect.
              // for other errors, show the error number before redirecting
              if (res.status != '404') {
                alert('There was an error getting the item\'s ' +
                  'details from the server.\nStatus code: ' + res.status);
              }
              $state.go('dk.item_list');
            });
          return deferred.promise;
        };
      }
    ]
  );
})();
