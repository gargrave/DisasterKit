(function() {
  'use strict';
  angular.module('dk').controller('MainController', MainController);
  MainController.$inject = ['$scope'];

  function MainController($scope) {
    var vm = this;
    console.log('MainController');
  }
})();

