(function() {
  'use strict';
  angular.module('dk').service('categoryUpdateSvc', [
    '$http',

    function($http) {
      var API_URL_UPDATE = 'items/api/update_category';
      var vm = this;

      vm.saveEdits = function(item, callback) {
        $http.post(API_URL_UPDATE, item)
          .then(function(res) {
            if (callback) {
              callback();
            }
          });
      };
    }]);
})();
