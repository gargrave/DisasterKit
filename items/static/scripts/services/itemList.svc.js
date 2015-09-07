(function() {
  'use strict';
  angular.module('dk').service('itemListSvc', itemListSvc);
  itemListSvc.$inject = ['$http', '$q'];

  function itemListSvc($http, $q) {
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
        });
      return deferred.promise;
    };
  }
})();
