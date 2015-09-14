(function() {
  'use strict';
  angular.module('dk').service('categoryListSvc', [
    '$http', '$q', '$state',

    function($http, $q, $state) {
      var vm = this;
      var combined = {};

      /**
       * Queries the API for a full list of categories and subcategories.
       */
      vm.getCategoryList = function(forceUpdate) {
        var force = forceUpdate || false;
        var deferred = $q.defer();

        if (combined.cats && combined.subcats && !force) {
          deferred.resolve(combined);
        } else {
          $http.get('items/api/get_categories')
            .then(function(res) {
              combined = {
                cats: res.data.cats,
                subcats: res.data.subcats
              };
              deferred.resolve(combined);
              // in case of error response, display error and return to home state
            }, function(res) {
              alert('There was an error getting the categories ' +
                'list from the server.\nStatus code: ' + res.status);
              $state.go('dk.home');
            });
        }
        return deferred.promise;
      };
    }]);
})();
