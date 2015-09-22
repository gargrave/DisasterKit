(function() {
  'use strict';
  angular.module('dk').controller('MainCtrl', [
    '$http',

    function($http) {
      var vm = this;

      vm.sendWeeklyReport = function() {
        $http.get('/items/api/email/weekly_report');
      };
    }
  ]);
})();
