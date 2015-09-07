(function() {
  'use strict';
  angular.module('dk').controller('MainController', MainController);
  MainController.$inject = ['$state', '$http'];

  function MainController($state, $http) {
    var vm = this;
    vm.asdf = 'fart';

    vm.class = {
      SIXCOLS: 'six columns offset-by-three'
    };
  }
})();

