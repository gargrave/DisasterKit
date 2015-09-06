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

    vm.getItemById = function(targetID) {
      for (var i in items) {
        if (items[i].id == targetID) {
          return items[i];
        }
      }
      return null;
    };
  }
})();
