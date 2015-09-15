(function() {
  'use strict';
  angular.module('dk').service('itemListSvc', [
    '$http', '$q', '$state',

    function($http, $q, $state) {
      var vm = this;
      var items = [];

      /**
       * Returns an invidual items instance matching the specified ID.
       *
       * @param {int} targetID - The ID of the items to find.
       */
      vm.getItemById = function(targetID) {
        var deferred = $q.defer();
        $http.get('items/api/get_item_by_id/' + targetID)
          .then(function(res) {
            deferred.resolve(res.data);
            // in case of error response, display error and return to list state
          }, function(res) {
            // for 404s, just redirect.
            // for other errors, show the error number before redirecting
            if (res.status != '404') {
              alert('There was an error getting the items\'s ' +
                'details from the server.\nStatus code: ' + res.status);
            }
            $state.go('dk.item_list');
          });
        return deferred.promise;
      };
    }]);
})();
