(function() {
  'use strict';
  angular.module('dk').service('categorySvc', [
    '$http', '$q', '$state',

    function($http, $q, $state) {
      var API_URL_GETPOST = 'items/api/category/';
      var API_URL_UPDATE = 'items/api/category/update';
      var API_URL_DELETE = 'items/api/category/delete/';
      var vm = this;
      var combined = {};

      /**
       * Queries the API for a full list of categories and subcategories.
       */
      vm.query = function(forceUpdate) {
        var force = forceUpdate || false;
        var deferred = $q.defer();

        if (combined.cats && combined.subcats && !force) {
          deferred.resolve(combined);
        } else {
          $http.get(API_URL_GETPOST)
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

      /**
       * Sends a POST request with the specified category to the server.
       * Returns the Promise objects from the query.
       *
       * @param {Object} category - The new category to create.
       * @returns {HttpPromise}
       */
      vm.create = function(category) {
        return $http.post(API_URL_GETPOST, category);
      };

      /**
       * Sends a POST request with the specified category to the server
       * to be updated. Returns the Promise object from the query.
       *
       * @param {Object} category - The category details to update.
       * @returns {HttpPromise}
       */
      vm.update = function(category) {
        return $http.post(API_URL_UPDATE, category);
      };

      /**
       * Sends the request to the server to delete the specified category.
       *
       * @param {Object} category - The Category to be deleted.
       */
      vm.delete = function(category) {
        return $http.post(API_URL_DELETE, {id: category.id});
      };
    }]);
})();
